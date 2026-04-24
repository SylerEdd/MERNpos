import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  // Show loading state while checking auth
  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-400">
        Loading...
      </div>
    );

  // If no user, redirect to login
  if (!user) return <Navigate to="/login" replace />;

  // if logged in show the page
  return <>{children}</>;
}
