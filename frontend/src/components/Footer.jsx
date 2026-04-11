import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 text-center py-2 mt-5 ">
      © {new Date().getFullYear()} AI Blog Website. All rights reserved.
    </footer>
  );
};

export default Footer;
