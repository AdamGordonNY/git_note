import React from "react";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className="flex  min-h-[100vh] items-center justify-center">
      <div
        className="inline-block size-4 animate-spin rounded-full border-4 border-solid border-white-500 align-[-0.125em]  motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <div
        className="inline-block size-4 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-white-100 align-[-0.125em] opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default LoadingSpinner;
