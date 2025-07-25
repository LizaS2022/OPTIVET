const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    viewUserById: async (_, { _id }) => {
      try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing user ID.");
        }
        const user = await User.findById(_id).populate({
          path: "appointments",
          populate: [{ path: "pet" }, { path: "vet" }, { path: "owner" }],
        });
        if (!user) {
          throw new Error("User not found.");
        }
        return user;
      } catch (error) {
        throw new Error("Error fetching user: " + error.message);
      }
    },
    viewUserByEmail: async (_, { email }) => {
      return await User.findOne({ email }).populate("pets");
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
    viewAppointment: async (_, { _id }) => {
      try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing appointment ID.");
        }
        const appointment = await Appointment.findById(_id)
          .populate("pet")
          .populate("owner")
          .populate("vet");
        if (!appointment) {
          throw new Error("Appointment not found.");
        }
        return appointment;
      } catch (error) {
        throw new Error("Error fetching appointment: " + error.message);
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
    viewAppointmentByDate: async (_, { date }) => {
      try {
        if (!date) {
          throw new Error("Date is required.");
        }
        const appointments = await Appointment.find({
          datetime: { $gte: new Date(date), $lt: new Date(date + "T23:59:59") },
        })
          .populate("pet")
          .populate("owner")
          .populate("vet");
        return appointments;
      } catch (error) {
        throw new Error(
          "Error fetching appointments by date: " + error.message
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
    viewPetsByOwner: async (_, { ownerId }) => {
      try {
        if (!ownerId || !mongoose.Types.ObjectId.isValid(ownerId)) {
          throw new Error("Invalid or missing owner ID.");
        }
        return await Pet.find({ owner: ownerId })
          .populate("owner")
          .populate("vet");
      } catch (error) {
        throw new Error("Error fetching pets by owner: " + error.message);
      }
    },
  },
  Mutation: {
    loginUser: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found.");
      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) throw new Error("Invalid password.");
      return user;
    },
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
        const { _id, ...updateFields } = args;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing pet ID.");
        }

        const updatedPet = await Pet.findByIdAndUpdate(_id, updateFields, {
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
        const { password, ...rest } = args;

        const existing = await User.findOne({ email: args.email });
        if (existing) {
          throw new Error("User with this email already exists.");
        }

        // Hash the incoming plain password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user with hashed password stored as passwordHash
        const user = new User({
          ...rest, // includes name, email, role, phone, address
          passwordHash: hashedPassword, // safe field
        });

        await user.save();
        return user;
      } catch (error) {
        console.error("Error adding user:", error);
        throw new Error("Error adding user: " + error.message);
      }
    },

    updateUser: async (_, args) => {
      try {
        const { _id, ...updateFields } = args;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing user ID.");
        }

        const updatedUser = await User.findByIdAndUpdate(_id, updateFields, {
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
    deleteUser: async (_, { _id }) => {
      try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing user ID.");
        }

        const deletedUser = await User.findByIdAndDelete(_id);
        if (!deletedUser) {
          throw new Error("User not found.");
        }

        return deletedUser;
      } catch (error) {
        throw new Error("Error deleting user: " + error.message);
      }
    },
    addAppointment: async (
      _,
      { petId, ownerId, vetId, appt_date, appt_time, reason }
    ) => {
      try {
        const appointment = new Appointment({
          pet: petId,
          owner: ownerId,
          vet: vetId || null,
          appt_date: new Date(appt_date),
          appt_time,
          reason,
        });
        await appointment.save();

        //Populating user appointment array
        await User.findByIdAndUpdate(ownerId, {
          $push: { appointments: appointment._id },
        });

        return await Appointment.findById(appointment._id)
          .populate("pet")
          .populate("owner")
          .populate("vet");
      } catch (error) {
        throw new Error("Error adding appointment: " + error.message);
      }
    },
    updateAppointment: async (_, args) => {
      try {
        const { _id, ...updateFields } = args;

        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing appointment ID.");
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(
          _id,
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
    deleteAppointment: async (_, { _id }) => {
      try {
        if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
          throw new Error("Invalid or missing appointment ID.");
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(
          _id
        ).populate("pet");
        if (!deletedAppointment) {
          throw new Error("Appointment not found.");
        }

        if (!deletedAppointment.pet) {
          throw new Error("Associated pet not found.");
        }

        return deletedAppointment;
      } catch (error) {
        throw new Error("Error deleting appointment: " + error.message);
      }
    },
    addMedicalRecord: async (_, args) => {
      try {
        const { petId, appointmentId, vetId, diagnosis, treatment, notes } =
          args;

        // Validate pet ID
        if (!petId || !mongoose.Types.ObjectId.isValid(petId)) {
          throw new Error("Invalid or missing pet ID.");
        }

        // Validate appointment ID
        if (!appointmentId || !mongoose.Types.ObjectId.isValid(appointmentId)) {
          throw new Error("Invalid or missing appointment ID.");
        }

        // Validate vet ID
        if (!vetId || !mongoose.Types.ObjectId.isValid(vetId)) {
          throw new Error("Invalid or missing vet ID.");
        }

        const medicalRecord = new MedicalRecord({
          petId,
          appointmentId,
          vetId,
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
