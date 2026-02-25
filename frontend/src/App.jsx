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
import Hero from "./Home/Hero";

import AuthProvider from "./context/AuthProvider";

const App = () => {
  return (
    <div className="flex flex-col">
      <Header />

      <main className="grow">
        <AuthProvider>
          <Routes>
            {/* routes WITH sidebar */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Hero />} />
              <Route path="/blogs" element={<Blogs />} />
            </Route>

            {/* routes WITHOUT sidebar */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </AuthProvider>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
