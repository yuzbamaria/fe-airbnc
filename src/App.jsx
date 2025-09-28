import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SingleProperty from "./components/SingleProperty";
import Reviews from "./components/Reviews";
import PropertyBooking from "./components/PropertyBooking";
import BookingConfirmation from "./components/BookingConfirmation";
import GuestProfile from "./components/GuestProfile";
import HostDashboard from "./components/HostDashboard";
import AddReview from "./components/AddReview";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  const propertiesSectionRef = useRef(null);
  const footerRef = useRef(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  function scrollToProperties() {
    propertiesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function scrollToFooter() {
    footerRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function handleSignupClickFromLogin() {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  }

  return (
    <div className="app">
      <Header
        onScrollToProperties={scrollToProperties}
        onScrollToFooter={scrollToFooter}
        onLogin={() => setIsLoginModalOpen(true)}
        onSignup={() => setIsSignupModalOpen(true)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home propertiesRef={propertiesSectionRef} />}
          />
          <Route path="/property/:id" element={<SingleProperty />} />
          <Route path="/property/:id/reviews" element={<Reviews />} />
          <Route
            path="/properties/:id/booking"
            element={
              <ProtectedRoute onLogin={() => setIsLoginModalOpen(true)}>
                <PropertyBooking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking-confirmation"
            element={
              <ProtectedRoute onLogin={() => setIsLoginModalOpen(true)}>
                <BookingConfirmation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users/:id"
            element={
              <ProtectedRoute onLogin={() => setIsLoginModalOpen(true)}>
                <GuestProfile />
              </ProtectedRoute>
            }
          />
          <Route path="/properties" element={<HostDashboard />} />
          <Route
            path="/properties/:id/reviews"
            element={
              <ProtectedRoute onLogin={() => setIsLoginModalOpen(true)}>
                <AddReview />
              </ProtectedRoute>
            }
          />
        </Routes>
        {isLoginModalOpen && (
          <Login
            setIsLoginModalOpen={setIsLoginModalOpen}
            onSignupClick={handleSignupClickFromLogin}
          />
        )}

        {isSignupModalOpen && (
          <Signup setIsSignupModalOpen={setIsSignupModalOpen} />
        )}
      </main>
      <Footer ref={footerRef} />
    </div>
  );
}

export default App;
