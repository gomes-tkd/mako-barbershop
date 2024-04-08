import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Login from "./Pages/Login/Login.jsx";
import Usuario from "./Pages/Usuario/Usuario.jsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path={"/"} element={<Home />} />
                <Route path={"/login/*"} element={<Login />} />
                <Route path={"/conta/*"} element={<Usuario />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </>
  );
}

export default App
