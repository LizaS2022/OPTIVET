import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import { AuthProvider } from "./hooks/use_auth";
import SignupPage from "./components/signup";
import LoginPage from "./components/Login";
import ScheduleAppointment from "./components/BookAppointment";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/UserDashboard";
import ApptConfirmation from "./components/ApptConfirmation";

const client = new ApolloClient({
  uri: "http://localhost:3001/graphql",
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <div className="flex-column justify-flex-start min-100-vh">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-appointment"
                element={
                  <ProtectedRoute>
                    <ScheduleAppointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/book-appointment/confirmation/:userId"
                element={<ApptConfirmation />}
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
