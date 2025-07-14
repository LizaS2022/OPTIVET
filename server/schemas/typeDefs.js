const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    name: String
    email: String
    passwordHash: String
    role: String
    phone: String
    address: String
  }
  type Pet {
    _id: ID
    name: String!
    species: String
    breed: String
    dob: Date
    gender: String
    allergies: [String]
    owner: User
    vet: User
  }

  type MedicalRecord {
    _id: ID
    pet: Pet
    appointment: Appointment
    vet: User
    diagnosis: String
    treatment: String
    notes: String
  }

  type Appointment {
    _id: ID
    pet: Pet
    owner: User
    vet: User
    datetime: Date
    status: String
    reason: String
    notes: String
  }

  type Query {
    viewUsers: [User]
    viewPets: [Pet]
    viewMedicalRecords: [MedicalRecord]
    viewAppointments: [Appointment]
    viewAppointmentsByPet(petId: ID!): [Appointment]
  }
  type Mutation {
    addUser(
      name: String
      email: String!
      passwordHash: String!
      role: String!
      phone: String!
      address: String!
    ): User

    updateUser(
      _id: ID!
      name: String
      email: String
      passwordHash: String
      role: String
      phone: String
      address: String
    ): User

    deleteUser(_id: ID!): User
    deletePet(_id: ID!): Pet
    deleteMedicalRecord(_id: ID!): MedicalRecord
    deleteAppointment(_id: ID!): Appointment

    updatePet(
      _id: ID!
      name: String
      species: String
      breed: String
      dob: Date
    ): Pet

    addPet(
      name: String!
      species: String!
      breed: String!
      dob: Date!
      gender: String!
      allergies: [String]
      ownerId: ID!
      vetId: ID
    ): Pet

    addMedicalRecord(
      petId: ID!
      appointmentId: ID!
      vetId: ID!
      diagnosis: String
      treatment: String
      notes: String
    ): MedicalRecord

    addAppointment(
      petId: ID!
      ownerId: ID!
      vetId: ID!
      datetime: Date!
      status: String
      reason: String
      notes: String
    ): Appointment

    updateAppointment(
      _id: ID!
      petId: ID
      ownerId: ID
      vetId: ID
      datetime: Date
      status: String
      reason: String
      notes: String
    ): Appointment

    updateMedicalRecord(
      _id: ID!
      petId: ID
      appointmentId: ID
      vetId: ID
      diagnosis: String
      treatment: String
      notes: String
    ): MedicalRecord
  }
`;

module.exports = typeDefs;
