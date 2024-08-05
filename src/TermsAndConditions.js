import React from 'react';

function TermsAndConditions({ nextStep }) {
  const handleAgree = () => {
    nextStep();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center p-6 bg-black rounded shadow border border-white max-w-lg w-full">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p className="mb-4">Please read and agree to the terms and conditions before proceeding.</p>
        <button
          className="py-3 px-6 rounded bg-white text-black border border-white"
          onClick={handleAgree}
        >
          Agree
        </button>
      </div>
    </div>
  );
}

export default TermsAndConditions;
