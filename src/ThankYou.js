import React from 'react';

function ThankYou() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-black rounded shadow border border-white max-w-2xl w-full"> {/* 调整 max-w 值 */}
        <h1 className="text-4xl font-bold mb-4 text-center">Thank You For Booking With Us</h1>
        <p className="text-lg text-center">You will receive a confirmation email shortly.</p>
      </div>
    </div>
  );
}

export default ThankYou;

