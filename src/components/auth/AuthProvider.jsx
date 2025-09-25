import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = useState(
    () => localStorage.getItem("token") || null
  ); // as reading from localStorage is a little expensive (I/O operation), passing a function as the code runs once on mount, instead of running every render (until setFunction updates).
  
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // const jwtDecode = jwtDecodeModule.default || jwtDecodeModule;

  // setting the header globally
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  // Handle login: send credentials to backend and store token + user
  function handleLogin(email, password) {
    const url = "https://be-airbnc-zw86.onrender.com/api/login";
    return axios.post(url, { email, password }).then((res) => {
        const { user, token } = res.data;
        const decoded = jwtDecode(token);  // Decode JWT to get expiry timestamp

        setAuthToken(token);
        setCurrentUser(user);

        // persist session
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", decoded.exp * 1000); // JWT exp is in seconds, convert to ms
        localStorage.setItem("user", JSON.stringify(user));

        scheduleAutoLogout(decoded.exp * 1000); // Schedule auto logout when token expires
        return res.data; 
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  }

  // Handle logout: clear all auth-related state and localStorage
  function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("user");
  }

  // Schedule automatic logout when the JWT expires
  function scheduleAutoLogout(expiryTime) {
    const delay = expiryTime - Date.now();
    if(delay > 0) {
      setTimeout(() => {
        handleLogout();
        alert("Session expired. Please log in again.")
      }, delay);
    }
  }

  // On mount: check if token exists and is still valid
  useEffect(() => {
    const expiry = localStorage.getItem("tokenExpiry");
    if (expiry && Date.now() < expiry) {
      scheduleAutoLogout(expiry); // Token is valid: schedule auto logout
    } else {
      handleLogout(); // Token expired or missing: logout immediately
    }
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        authToken,
        currentUser,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for consuming the AuthContext
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
