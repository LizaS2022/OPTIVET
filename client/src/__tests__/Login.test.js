import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../hooks/use_auth";
import LoginPage from "../components/Login";

let mockLoginMutation;

// Mock useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Mock Apollo useMutation and useApolloClient
jest.mock("@apollo/client", () => {
  const actual = jest.requireActual("@apollo/client");
  return {
    ...actual,
    useApolloClient: () => ({
      query: jest.fn().mockResolvedValue({ data: { viewUsers: [] } }),
    }),
    useMutation: () => [mockLoginMutation],
  };
});

describe("LoginPage", () => {
  it("renders login form", () => {
    mockLoginMutation = jest.fn();
    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it("submits the form successfully", async () => {
    mockLoginMutation = jest.fn().mockResolvedValue({
      data: { loginUser: { email: "test@example.com" } },
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Signing in.../i)).not.toBeInTheDocument();
    });
  });

  it("shows error on failed login", async () => {
    jest.spyOn(console, "error").mockImplementation(() => {}); // silence error log
    mockLoginMutation = jest.fn().mockRejectedValue(new Error("Invalid login"));

    render(
      <MemoryRouter>
        <AuthProvider>
          <LoginPage />
        </AuthProvider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "fail@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "wrong" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Invalid email or password/i)
      ).toBeInTheDocument();
    });
  });
});
