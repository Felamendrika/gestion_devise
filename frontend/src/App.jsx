import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CurrencyConverter from "./components/CurrencyConverter/CurrencyConverter";
import ExchangeRates from "./components/ExchangeRates/ExchangeRates";
import LandingPage from "./components/layout/LandingPage";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <Router>
      <div className=" w-full min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar />
        <main className="w-full">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/converter" element={<CurrencyConverter />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
