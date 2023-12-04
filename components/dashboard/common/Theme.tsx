"use client";

import { useEffect } from "react";
import { themeChange } from "theme-change";

interface ComponentProps {
  Component: any;
  pageProps: any;
}

export default function Theme({ Component, pageProps }: ComponentProps) {
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

  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <div className="dropdown-content bg-base-200 text-base-content rounded-t-box rounded-b-box top-px max-h-96 h-[70vh] w-52 overflow-y-auto shadow-2xl mt-16">
      {themes.map((value) => (
        <div key={value} className="grid grid-cols-1 gap-3 p-3" tabIndex={0}>
          <div
            className="outline-base-content overflow-hidden rounded-lg outline outline-2 outline-offset-2"
            data-set-theme={value}
            data-act-class="outline"
          >
            <div
              data-theme={value}
              className="bg-base-100 text-base-content w-full cursor-pointer font-sans"
            >
              <div className="grid grid-cols-5 grid-rows-3">
                <div className="col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4">
                  <div className="flex-grow text-sm font-bold">{value}</div>
                  <div className="flex flex-shrink-0 flex-wrap gap-1">
                    <div className="bg-primary w-2 rounded"></div>
                    <div className="bg-secondary w-2 rounded"></div>
                    <div className="bg-accent w-2 rounded"></div>
                    <div className="bg-neutral w-2 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
