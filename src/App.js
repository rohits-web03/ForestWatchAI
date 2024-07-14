import React from "react";
import "./styles.css"
import Navbar from "./Components/Navbar"
import { Route,Routes } from "react-router-dom";
import Home from "./routes/Home";
import About from "./routes/About";
import Service from "./routes/Service";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Poacher from "./routes/Poacher";
import ForestFire from "./routes/ForestFire";
import Flood from "./routes/Flood";
import "./styles.css";


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/service" element={<Service />}/>
        <Route path="/poacher detection" element={<Poacher />}/>
        <Route path="/forest fire alert" element={<ForestFire />}/>
        <Route path="/flood alert" element={<Flood />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
      </Routes>  
    </div> 
  );
}


