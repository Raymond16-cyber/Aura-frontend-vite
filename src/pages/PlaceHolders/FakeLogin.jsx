import React from "react";
import { motion } from "framer-motion";

export const PlaceHolderLogin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--aura-bg) p-4">
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <h1 className="text-2xl font-bold mb-3 text-(--aura-accent)">
          Cool Down!
        </h1>
        <p className="text-gray-600 mb-6">
          Aura is still in production. We'll be ready soon!
        </p>
        <button
          disabled
          className="bg-(--aura-primary) text-white px-6 py-2 rounded-xl opacity-60 cursor-not-allowed"
        >
          Login (Coming Soon)
        </button>
      </motion.div>
    </div>
  );
};

export default PlaceHolderLogin;
