import React from "react";
import { motion } from "framer-motion";

const Loader = ({ className = "" }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <motion.div
        className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default Loader;
