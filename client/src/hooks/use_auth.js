import { createContext, useContext, useState, useEffect } from "react";
import { useApolloClient, useQuery, useLazyQuery } from "@apollo/client";
import { VIEW_USERS, USER_BY_EMAIL, VIEW_APPOINTMENTS } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { CREATE_USER, CREATE_APPT, USER_LOGIN } from "../utils/mutations";

// Default: no user logged in
const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const client = useApolloClient();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check localStorage for saved user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const [loginUserMutation] = useMutation(USER_LOGIN);
  const login = async (email, password) => {
    setLoading(true);
    try {
      console.log("Calling login mutation...");
      const { data } = await loginUserMutation({
        variables: { email, password },
      });
      console.log("Login response:", data);
      const userData = data.loginUser;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const [addUser] = useMutation(CREATE_USER);

  const signup = async (
    first_name,
    last_name,
    email,
    password,
    address,
    role,
    phone
  ) => {
    setLoading(true);
    try {
      // Step 1: Check if email exists
      const { data } = await client.query({
        query: VIEW_USERS,
      });

      const emailExists = data?.viewUsers.some(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      );

      if (emailExists) {
        throw new Error("Email already exists in the system");
      }

      const response = await addUser({
        variables: {
          first_name,
          last_name,
          email,
          password, // plain password — backend hashes it
          address,
          role,
          phone,
        },
      });

      const newUser = response.data.addUser;

      // Step 3: Save returned user data
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      console.error("Signup failed", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const [addAppointment] = useMutation(CREATE_APPT);
  const bookAppointment = async (
    pet,
    owner,
    vet,
    appt_date,
    appt_time,
    reason
  ) => {
    setLoading(true);
    try {
      const { data } = await addAppointment({
        variables: {
          petId: pet._id,
          ownerId: owner._id,
          vetId: vet ? vet._id : null,
          apptDate: appt_date,
          apptTime: appt_time,
          reason: reason || "",
        },
      });
      return data.addAppointment;
    } catch (err) {
      console.error("Booking failed", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, bookAppointment, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
