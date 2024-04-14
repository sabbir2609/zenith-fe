"use client";

import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  function tick() {
    setCurrentDateTime(new Date());
  }

  // Get date, time, and day
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  const currentDate = currentDateTime.toLocaleDateString(undefined, options); //TODO: Fix this
  const currentTime = currentDateTime.toLocaleTimeString();
  const currentDay = currentDate.charAt(0).toUpperCase() + currentDate.slice(1); // Capitalize the first letter

  return (
    <div className='flex flex-col ms-2 p-2'>
      <p className='text-3xl font-semibold'>
        {currentDateTime.toLocaleDateString(undefined, { weekday: 'long' })}
      </p>
      <p className='font-semibold'>
        {currentDay}
      </p>
      {/* <p className='text-2xl' suppressHydrationWarning>
        {currentTime}
      </p> */}
    </div>
  );
}

export default DateTimeDisplay;
