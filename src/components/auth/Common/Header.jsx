import React from "react";

const Header = () => {
  return (
    <div className="flex items-center justify-center gap-4 p-6">
      <div className="logoImg rounded-full">
        <img
          src="/icons/icon-512x512.png"
          alt=""
          className="h-13 object-cover rounded-full"
        />
      </div>
      <h1 className="font-bold text-2xl">Aura</h1>
    </div>
  );
};

export default Header;
