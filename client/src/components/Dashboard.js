import React from "react";
import { useParams } from "react-router-dom";
import ScheduleAppointment from "./BookAppointment";
import NavigationBar from "./NavigationBar";
import { useAuth } from "../hooks/use_auth";
import Footer from "./Footer";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <NavigationBar />
      <div className="container py-5">
        <h2>
          Welcome, {user?.firstName} {user?.lastName}{" "}
        </h2>
        <div className="px-6 py-3">
          <ScheduleAppointment />
        </div>
      </div>
      <Footer />
    </div>
  );
}
