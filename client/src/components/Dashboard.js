import React from "react";
import ScheduleAppointment from "./BookAppointment";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    <div>
      <NavigationBar />
      <div className="container py-5">
        <h2>Welcome to Your Dashboard</h2>
        <div px-6 py-3>
          <ScheduleAppointment />
        </div>
      </div>
      <Footer />
    </div>
  );
}
