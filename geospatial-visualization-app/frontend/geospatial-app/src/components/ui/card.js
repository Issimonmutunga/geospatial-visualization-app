import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md p-4 border ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
