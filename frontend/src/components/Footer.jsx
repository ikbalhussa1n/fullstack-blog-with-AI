import React from "react";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-gray-900 text-gray-300 py-2 text-center ">
      © {new Date().getFullYear()} AI Blog Website. All rights reserved.
    </footer>
  );
};

export default Footer;
