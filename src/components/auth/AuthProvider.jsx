import { createContext, useContext, useState, useEffect } from "react";
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

  // setting the header globally
  useEffect(() => {
    if (authToken) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${authToken}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [authToken]);

  function handleLogin(email, password) {
    const url = "https://be-airbnc-zw86.onrender.com/api/login";
    return axios.post(url, { email, password }).then((res) => {
        const { user, token } = res.data;

        setAuthToken(token);
        setCurrentUser(user);

        // persist session
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        return res.data; 
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  }

  function handleLogout() {
    setAuthToken(null);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

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

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
