import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { VIEW_USERS, VIEW_USERS_BY_ID } from "../utils/queries";
import "bootstrap/dist/css/bootstrap.min.css";

const AptConfirmation = () => {
  const { userId } = useParams();
  console.log("UserId from params:", userId);
  const { loading, data } = useQuery(VIEW_USERS_BY_ID, {
    variables: { _id: userId },
  });

  console.log("what is data in confirmation", data);
  const appointment = data?.viewUserById || [];
  console.log(appointment);

  if (
    loading ||
    !appointment.appointments ||
    appointment.appointments.length === 0
  ) {
    return <h3> No appointment has been booked</h3>;
  }
  console.log("the appointment is", appointment.appointments[0].appt_date);

  return (
    <div>
      {" "}
      <NavigationBar />
      <section className="section confirmation">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="confirmation-content text-center">
                <i className="icofont-check-circled text-lg text-color-2"></i>
                <h2 className="mt-3 mb-4">Thank you for your appointment</h2>
                <div>
                  {appointment.appointments
                    .slice(-1)
                    .map((appointment, index) => {
                      const { appt_date, appt_time, id, pet } = appointment;
                      return (
                        <div key={index}>
                          <div>
                            {appointment.pet?.name.charAt(0).toUpperCase() +
                              appointment.pet.name.slice(1) || "Your pet"}{" "}
                            is booked on{" "}
                            {new Date(appt_date).toLocaleDateString()} at{" "}
                          </div>
                          <div>Appointment Time: {appt_time} </div>
                          <div>
                            Your appointment confirmation number is: {id}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AptConfirmation;
