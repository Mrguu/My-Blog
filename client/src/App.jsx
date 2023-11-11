import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Singleblog from "./pages/Singleblog";
import CreateBlog from "./pages/createBlog";
import EditBlog from "./pages/Editblog";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <SkeletonTheme baseColor="#71689c" highlightColor="#4c4573">
          <div className="text-[#4c4573]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/single/:id" element={<Singleblog />} />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/blog/create" element={<CreateBlog />} />
              <Route path="/blog/edit/:id" element={<EditBlog />} />
            </Routes>
          </div>
        </SkeletonTheme>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
