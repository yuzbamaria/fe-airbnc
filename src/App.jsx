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

function App() {
  const propertiesSectionRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  function handleLoginLinkClick() {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  }

  function handleSignupClickFromLogin() {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  }

  return (
    <div className="app">
      <Header
        propertiesRef={propertiesSectionRef}
        onLoginClick={() => setIsLoginModalOpen(true)}
        onSignupClick={() => setIsSignupModalOpen(true)}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home propertiesRef={propertiesSectionRef} />}
          />
          <Route path="/property/:id" element={<SingleProperty />} />
          <Route path="/property/:id/reviews" element={<Reviews />} />
          <Route path="/properties/:id/booking" element={<PropertyBooking />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />
          <Route path="/users/:id" element={<GuestProfile />} />
          <Route path="/properties" element={<HostDashboard />} />
          <Route path="/properties/:id/reviews" element={<AddReview />} />
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
      <Footer />
    </div>
  );
}

export default App;
