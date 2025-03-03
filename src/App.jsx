import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SingleProperty from "./components/SingleProperty";
import Reviews from "./components/Reviews";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Footer />} />
          <Route path="/property/:id" element={<SingleProperty />} />
          <Route path="/property/:id/reviews" element={<Reviews />} />
        </Routes>
      <Footer />
    </>
    
  );
}

export default App;
