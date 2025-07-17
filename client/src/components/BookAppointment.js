import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/use_auth";
import { Modal, Button, Form } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { useQuery } from "@apollo/client";
import {
  VIEW_PETS_BY_OWNER,
  VIEW_USERS,
  VIEW_APPOINTMENTS,
} from "../utils/queries";

export default function ScheduleAppointment() {
  const [submitting, setSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [pet, setPetName] = useState("");
  const [vet, setVet] = useState("");
  const [appt_date, setApptDate] = useState("");
  const [appt_time, setApptTime] = useState("");
  const [reason, setReason] = useState("");

  const { user, bookAppointment } = useAuth();
  const navigate = useNavigate();

  //Fetch user pets
  const { data: petData, loading: petsLoading } = useQuery(VIEW_PETS_BY_OWNER, {
    variables: { ownerId: user?._id },
    skip: !user,
  });

  //Fetch all users and fetch for vets
  const { data: vetData, loading: vetLoading } = useQuery(VIEW_USERS);
  const vets = vetData?.viewUsers.filter((user) => user.role === "vet") || [];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!user || !user._id) {
      alert("User not loaded yet. Please try again in a moment.");
      return;
    }

    if (!pet || !appt_date || !appt_time) {
      alert("Please fill out pet, date, and time before submitting.");
      return;
    }
    setSubmitting(true);
    setIsOpen(false);

    try {
      console.log("Booking appointment with variables:", {
        petId: pet,
        ownerId: user?._id,
        vetId: vet || null,
        apptDate: appt_date,
        apptTime: appt_time,
        reason: reason || "",
      });
      //Mutation to add the appointment ro database
      const data = await bookAppointment(
        { _id: pet },
        user,
        vet ? { _id: vet } : null,
        appt_date,
        appt_time,
        reason
      );
      navigate(`/confirmation/${data._id}`);
    } catch (error) {
      console.error("Error booking appointment:", {
        message: error.message,
        name: error.name,
        networkError: error.networkError,
        graphQLErrors: error.graphQLErrors,
      });
      // Handle error (e.g., show a notification)
      alert("Failed to book appointment. Please try again.");
    } finally {
      setSubmitting(false);
      setPetName("");
      setApptDate("");
      setApptTime("");
      setReason("");
      setVet("");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setIsOpen(true)}>
        <CalendarPlus size={16} className="me-2" />
        Schedule Appointment
      </Button>

      <Modal show={isOpen} onHide={() => setIsOpen(false)} centered>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule New Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className="text-muted mb-3">
              Fill in the details to book an appointment for your pet
            </p>

            <Form.Group className="mb-3" controlId="petSelect">
              <Form.Label>Select Pet</Form.Label>
              <Form.Select
                value={pet}
                onChange={(e) => setPetName(e.target.value)}
                required
                disabled={petsLoading}
              >
                <option value="">Select your pet</option>
                {petData?.viewPetsByOwner?.map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={appt_date}
                onChange={(e) => setApptDate(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="time">
              <Form.Label>Time</Form.Label>
              <Form.Select
                value={appt_time}
                onChange={(e) => setApptTime(e.target.value)}
                required
              >
                <option value="">Select time</option>
                <option value="9:00 AM">9:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="4:00 PM">4:00 PM</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>Reason for Visit</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="vetSelect">
              <Form.Label>Preferred Veterinarian</Form.Label>
              <Form.Select
                value={vet}
                onChange={(e) => setVet(e.target.value)}
                disabled={vetLoading}
              >
                <option value="">No Preference</option>
                {vets.map((v) => (
                  <option key={v._id} value={v._id}>
                    Dr. {v.first_name} {v.last_name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!user || petsLoading || vetLoading}
            >
              Schedule Appointment
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}
