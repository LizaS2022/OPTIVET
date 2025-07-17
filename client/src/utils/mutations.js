import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation Mutation(
    $first_name: String!
    $last_name: String!
    $email: String!
    $password: String!
    $address: String!
    $role: String!
    $phone: String!
  ) {
    addUser(
      first_name: $first_name
      last_name: $last_name
      email: $email
      password: $password
      address: $address
      role: $role
      phone: $phone
    ) {
      _id
      first_name
      last_name
      email
      address
      role
      phone
    }
  }
`;

export const CREATE_APPT = gql`
  mutation (
    $petId: ID!
    $ownerId: ID!
    $vetId: ID
    $apptDate: String!
    $apptTime: String!
    $reason: String
  ) {
    addAppointment(
      petId: $petId
      ownerId: $ownerId
      vetId: $vetId
      appt_date: $apptDate
      appt_time: $apptTime
      reason: $reason
    ) {
      _id
      pet {
        _id
      }
      owner {
        _id
        first_name
        last_name
        email
        passwordHash
        role
        phone
        address
      }
    }
  }
`;

export const USER_LOGIN = gql`
  mutation getUserByEmailAndPassword($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      _id
      first_name
      last_name
      email
      role
      phone
      address
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
      first_name
      last_name
      email
      role
      phone
      address
    }
  }
`;
