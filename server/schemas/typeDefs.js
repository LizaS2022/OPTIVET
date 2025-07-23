const { gql } = require("apollo-server-express");
const typeDefs = gql`
  scalar Date

  type User {
    _id: ID
    first_name: String
    last_name: String
    email: String
    passwordHash: String
    role: String
    phone: String
    address: String
    appointments: [Appointment]
  }
  type Pet {
    _id: ID
    name: String!
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
    appt_date: Date
    appt_time: String
    reason: String
  }

  type Query {
    viewPets: [Pet]
    viewUsers: [User]
    viewUserById(_id: ID!): User
    viewUserByEmail(email: String!): User
    viewAppointments: [Appointment]
    viewAppointment(_id: ID!): Appointment
    viewAppointmentsByPet(petId: ID!): [Appointment]
    viewAppointmentByDate(date: Date!): [Appointment]
    viewPetsByOwner(ownerId: ID!): [Pet]
    viewMedicalRecords: [MedicalRecord]
  }
  type Mutation {
    addUser(
      first_name: String!
      last_name: String!
      email: String!
      password: String!
      role: String!
      phone: String!
      address: String!
    ): User

    updateUser(
      _id: ID!
      first_name: String!
      last_name: String!
      email: String
      passwordHash: String
      role: String
      phone: String
      address: String
    ): User

    loginUser(email: String!, password: String!): User
    deleteUser(_id: ID!): User
    deletePet(_id: ID!): Pet
    deleteMedicalRecord(_id: ID!): MedicalRecord
    deleteAppointment(_id: ID!): Appointment

    updatePet(_id: ID!, name: String, breed: String, dob: Date): Pet

    addPet(
      name: String!
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
      vetId: ID
      appt_date: String!
      appt_time: String!
      reason: String
    ): Appointment

    updateAppointment(
      _id: ID!
      petId: ID
      ownerId: ID
      vetId: ID
      appt_date: Date
      appt_time: String
      reason: String
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
