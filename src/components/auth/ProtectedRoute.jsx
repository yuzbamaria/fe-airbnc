import { useAuth } from "./AuthProvider";
import { useEffect } from "react";

export default function ProtectedRoute({ children, onLogin }) {
  const { currentUser } = useAuth();
  
  useEffect(() => {
    if (!currentUser && onLogin) { // User not logged in - redirect to home or login
      onLogin(); // open modal after render
    }
  }, [currentUser, onLogin]);

  if (!currentUser) {
    return null; // do not render the protected component if user isn't logged in 
  }

  return children; // User logged in - show the protected page 

}
