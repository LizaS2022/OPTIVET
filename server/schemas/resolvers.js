const mongoose = require("mongoose");

const {
  Appointment,
  Bill,
  MedicalRecord,
  Message,
  Payment,
  Pet,
  User,
} = require("../models");

const resolvers = {
  Query: {
    viewPets: async () => {
      try {
        return await Pet.find().populate("owner").populate("vet");
      } catch (error) {
        throw new Error("Error fetching pets: " + error.message);
      }
    },
    viewUsers: async () => {
      try {
        return await User.find();
      } catch (error) {
        throw new Error("Error fetching users: " + error.message);
      }
    },
    viewAppointments: async () => {
      try {
        return await Appointment.find()
          .populate("pet")
          .populate("owner")
          .populate("vet");
      } catch (error) {
        throw new Error("Error fetching appointments: " + error.message);
      }
    },
    viewAppointmentsByPet: async (_, { petId }) => {
      try {
        if (!petId || !mongoose.Types.ObjectId.isValid(petId)) {
          throw new Error("Invalid or missing pet ID.");
        }
        return await Appointment.find({ pet: petId })
          .populate("pet")
          .populate("owner")
          .populate("vet");
      } catch (error) {
        throw new Error(
          "Error fetching appointments for pet: " + error.message
        );
      }
    },
    viewMedicalRecords: async () => {
      try {
        return await MedicalRecord.find()
          .populate("pet")
          .populate("appointment")
          .populate("vet");
      } catch (error) {
        throw new Error("Error fetching medical records: " + error.message);
      }
    },
  },
  Mutation: {
    addPet: async (_, args) => {
      try {
        const { name, species, breed, dob, gender, allergies, ownerId, vetId } =
          args;

        // Check if owner is valid
        if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
          throw new Error("Invalid or missing owner ID.");
        }

        const userExists = await User.findById(ownerId);
        if (!userExists) {
          throw new Error("Owner not found.");
        }

        const pet = new Pet({
          name,
          species,
          breed,
          dob,
          gender,
          allergies,
          owner: ownerId,
          vet: vetId,
        });
        // Check if vet is valid
        await pet.save();

        // Return with populated owner
        const populatedPet = await Pet.findById(pet._id)
          .populate("owner")
          .populate("vet");
        return populatedPet;
      } catch (error) {
        throw new Error("Error adding pet: " + error.message);
      }
    },
    updatePet: async (_, args) => {
      try {
        const { petId, ...updateFields } = args;

        if (!petId || !mongoose.Types.ObjectId.isValid(petId)) {
          throw new Error("Invalid or missing pet ID.");
        }

        const updatedPet = await Pet.findByIdAndUpdate(petId, updateFields, {
          new: true,
        })
          .populate("owner")
          .populate("vet");

        if (!updatedPet) {
          throw new Error("Pet not found.");
        }

        return updatedPet;
      } catch (error) {
        throw new Error("Error updating pet: " + error.message);
      }
    },
    deletePet: async (_, { _id }) => {
      try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing pet ID.");
        }

        const deletedPet = await Pet.findByIdAndDelete(_id);
        if (!deletedPet) {
          throw new Error("Pet not found.");
        }

        return deletedPet;
      } catch (error) {
        throw new Error("Error deleting pet: " + error.message);
      }
    },

    addUser: async (_, args) => {
      try {
        const existing = await User.findOne({ email: args.email });
        if (existing) {
          throw new Error("User with this email already exists.");
        }
        const user = new User(args);
        await user.save();
        return user;
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Error adding user: " + error.message);
      }
    },
    updateUser: async (_, args) => {
      try {
        const { userId, ...updateFields } = args;

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error("Invalid or missing user ID.");
        }

        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
          new: true,
        });

        if (!updatedUser) {
          throw new Error("User not found.");
        }

        return updatedUser;
      } catch (error) {
        throw new Error("Error updating user: " + error.message);
      }
    },
    deleteUser: async (_, { userId }) => {
      try {
        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
          throw new Error("Invalid or missing user ID.");
        }

        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
          throw new Error("User not found.");
        }

        return deletedUser;
      } catch (error) {
        throw new Error("Error deleting user: " + error.message);
      }
    },
    addAppointment: async (_, args) => {
      try {
        const appointment = new Appointment(args);
        await appointment.save();
        return appointment;
      } catch (error) {
        throw new Error("Error adding appointment: " + error.message);
      }
    },
    updateAppointment: async (_, args) => {
      try {
        const { appointmentId, ...updateFields } = args;

        if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
          throw new Error("Invalid or missing appointment ID.");
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
          appointmentId,
          updateFields,
          { new: true }
        )
          .populate("pet")
          .populate("owner")
          .populate("vet");

        if (!updatedAppointment) {
          throw new Error("Appointment not found.");
        }

        return updatedAppointment;
      } catch (error) {
        throw new Error("Error updating appointment: " + error.message);
      }
    },
    deleteAppointment: async (_, { appointmentId }) => {
      try {
        if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
          throw new Error("Invalid or missing appointment ID.");
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(
          appointmentId
        );
        if (!deletedAppointment) {
          throw new Error("Appointment not found.");
        }

        return deletedAppointment;
      } catch (error) {
        throw new Error("Error deleting appointment: " + error.message);
      }
    },
    addMedicalRecord: async (_, args) => {
      try {
        const { pet, appointment, vet, diagnosis, treatment, notes } = args;

        // Validate pet ID
        if (!pet || !mongoose.Types.ObjectId.isValid(pet)) {
          throw new Error("Invalid or missing pet ID.");
        }

        // Validate appointment ID
        if (!appointment || !mongoose.Types.ObjectId.isValid(appointment)) {
          throw new Error("Invalid or missing appointment ID.");
        }

        // Validate vet ID
        if (!vet || !mongoose.Types.ObjectId.isValid(vet)) {
          throw new Error("Invalid or missing vet ID.");
        }

        const medicalRecord = new MedicalRecord({
          pet,
          appointment,
          vet,
          diagnosis,
          treatment,
          notes,
        });
        await medicalRecord.save();
        return medicalRecord;
      } catch (error) {
        throw new Error("Error adding medical record: " + error.message);
      }
    },
  },
};

module.exports = resolvers;
