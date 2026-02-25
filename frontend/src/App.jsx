import React from "react";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Routes, Route } from "react-router-dom";
import Blogs from "./pages/Blogs";
import ContactUs from "./pages/ContactUs";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error404 from "./pages/Error404";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main content grows to fill space */}
      <main className="grow">
        <MainLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </MainLayout>
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default App;
