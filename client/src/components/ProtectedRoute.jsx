import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Optional: Show loading while checking user
  if (loading) return <div>Loading...</div>;

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // If user is logged in, render the child component
  return children;
}
