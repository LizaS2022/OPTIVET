## Database Schema

The OptiVet App uses a normalized relational schema to manage users, pets, appointments, medical records, messaging, and billing. Below is a high-level overview of the main tables and their relationships:

- **User**: Pet owners, veterinarians, staff, and admins
- **Pet**: Each pet belongs to a user
- **Appointment**: Connects pets, veterinarians, and times
- **MedicalRecord**: Tracks diagnoses and treatments per appointment
- **Message**: Enables secure communication between users
- **Bill**: Generated per appointment
- **Payment**: Linked to a bill

## Querries && Mutations:

pet: viewPets, addPet, updatepet, deletePet

user: viewUsers, addUser, updateuser, deleteUser

appointment: viewAppointments, viewAppointmentsByPet, addAppointment, updateAppointment, deleteAppointment

record: viewMedicalRecords, addMedicalRecord

### ERD Diagram


### Example Table Relationships

- One **User** has many **Pets**
- One **Pet** has many **Appointments** and **MedicalRecords**
- One **Appointment** is linked to one **Pet**, one **Vet** (User), one **Bill**, and one **MedicalRecord**
- **Messages** are sent between **Users**
- Each **Bill** is for one **Appointment**, and each **Payment** is linked to a **Bill**

### GraphQL API

The backend exposes a GraphQL API for all main operations, including:

- Querying users, pets, appointments, and medical records
- Booking appointments, sending messages, and processing payments
