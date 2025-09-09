import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useRef } from "react";
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

function App() {
  const propertiesSectionRef = useRef(null);

  return (
    <div className="app">
      <Header propertiesRef={propertiesSectionRef} />
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
      </main>
      <Footer />
    </div>
  );
}

export default App;
