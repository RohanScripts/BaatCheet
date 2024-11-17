import React from "react";
import logoPng from "../assets/logoPng.png";

const Header = () => {
  return (
    <header className="items-center bg-gradient-to-r from-green-500 to-purple-600 flex justify-between py-2 pr-3">
      <div className="cursor-pointer flex items-center justify-center">
        <img className="w-60" src={logoPng} alt="" />
      </div>
      <div>
        <button className="bg-white text-blue-600 px-4 py-1 rounded-full border-2 ">
          Profile
        </button>
      </div>
    </header>
  );
};

export default Header;
