const {
  Appointment,
  Bill,
  MedicalRecords,
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
  },
};
