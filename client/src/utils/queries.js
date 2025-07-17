import { gql } from "@apollo/client";

export const VIEW_USERS = gql`
  query seeAllUsers {
    viewUsers {
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

export const VIEW_APPOINTMENT = gql`
  query seeAllAppointments {
    viewAppointments {
      _id
      pet {
        _id
        name
        breed
        dob
        gender
        allergies
      }
      owner {
        _id
        first_name
        last_name
        email
        phone
        address
      }
      vet {
        _id
        first_name
        last_name
        email
        phone
        address
      }
      appt_date
      appt_time
      status
      reason
      notes
    }
  }
`;

export const USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!) {
    viewUserByEmail(email: $email) {
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

export const VIEW_PETS_BY_OWNER = gql`
  query Query($ownerId: ID!) {
    viewPetsByOwner(ownerId: $ownerId) {
      _id
      name
      breed
      dob
      gender
      allergies
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
