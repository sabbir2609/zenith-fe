"use client";

import Theme from "@/components/dashboard/common/Theme";
import React, { useState } from "react";

export default function Fab() {
  const [isUnfolded, setIsUnfolded] = useState(false);

  const handleButtonClick = () => {
    setIsUnfolded(!isUnfolded);
  };

  return (
    <div className="fixed bottom-8 right-8">
      <div
        className={`w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center cursor-pointer ${
          isUnfolded ? "rounded-bl-none rounded-br-none" : ""
        }`}
        onClick={handleButtonClick}
      >
        <span className="text-white">+</span>
      </div>
      {isUnfolded && (
        <div className="flex flex-col space-y-2 bg-white p-2 rounded-md shadow-md mt-2">
          <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
            Button 1
          </button>
          <button className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">
            <Theme Component={undefined} pageProps={undefined} />
          </button>
          <button className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">
            Button 3
          </button>
        </div>
      )}
    </div>
  );
}
