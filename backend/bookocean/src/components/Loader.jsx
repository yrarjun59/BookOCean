import React from "react";
import "../assets/css/Loader.css"; // CSS file for styling the loader

const Loader = () => {
  return (
    <div className="loader active">
      <div className="logo-container">
        <img src="/book.svg" alt="Logo" className="logol fade-in-out" />
      </div>
    </div>
  );
};

export default Loader;
