import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import SingleProperty from "./components/SingleProperty";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contacts" element={<Footer />} />
          <Route path="/property/:id" element={<SingleProperty />} />
        </Routes>
      <Footer />
    </>
    
  );
}

export default App;
