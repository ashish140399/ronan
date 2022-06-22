import React from "react";
import Landing from "./views/Landing";
import NavigationBar from "./components/Navbar";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./views/Portfolio";
import Blog from "./views/Blog";
import BlogOne from "./views/Blog/pages/One";


function App() {
  return (
    <>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/ethereum-gas-dangers/" element={<BlogOne />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
