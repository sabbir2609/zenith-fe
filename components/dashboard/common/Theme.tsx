"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";

export default function Theme() {
  const themes = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cmyk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffee",
    "winter",
  ];

  const CheckmarkSvg = ({ isVisible }: { isVisible: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={`${isVisible ? 'visible' : 'invisible'} h-3 w-3 shrink-0`}>
      <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"></path>
    </svg>
  );

  const currentTheme = localStorage.getItem("theme") || "light";
  const { changeTheme } = useContext(ThemeContext);


  return (
    <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-56 overflow-y-auto shadow-2xl mt-16">
      {themes.map((value) => (
        <div key={value} className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          <button
            className="outline-base-content text-start outline-offset-4"
            data-set-theme={value}
            onClick={() => changeTheme(value)}
          >
            <span
              data-theme={value}
              className="bg-base-100 rounded-btn text-base-content block w-full cursor-pointer font-sans"
            >
              <span className="grid grid-cols-5 grid-rows-3">
                <span className="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3">
                  <CheckmarkSvg isVisible={currentTheme === value} />
                  <span className="flex-grow text-sm">{value}</span>
                  <span className="flex h-full shrink-0 flex-wrap gap-1">
                    <span className="bg-primary rounded-badge w-2"></span>
                    <span className="bg-primary rounded-badge w-2"></span>
                    <span className="bg-secondary rounded-badge w-2"></span>
                    <span className="bg-accent rounded-badge w-2"></span>
                    <span className="bg-neutral rounded-badge w-2"></span>
                  </span>
                </span>
              </span>
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}