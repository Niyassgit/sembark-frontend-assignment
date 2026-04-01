import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
        <h1 className="text-5xl font-extrabold text-blue-600 mb-4 animate-bounce">
          Tailwind Connected!
        </h1>
        <p className="text-xl text-gray-600">
          Welcome to your new e-commerce application.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
