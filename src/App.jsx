import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/contacts" element={<Footer />}/>
        </Routes>
      <Footer />
    </>
    
  );
}

export default App;
