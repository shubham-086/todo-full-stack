import React from "react";

const Tabs = ({ activeBtn, setActiveBtn }) => {
  return (
    <div className="grid grid-cols-3 gap-3 bg-white shadow-lg p-4 rounded-md">
      <button
        onClick={() => setActiveBtn("pending")}
        className={`px-3 py-2 text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          activeBtn === "pending"
            ? "border-0 bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
            : "border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 active:border-purple-700"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setActiveBtn("completed")}
        className={`px-3 py-2 text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          activeBtn === "completed"
            ? "border-0 bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
            : "border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 active:border-purple-700"
        }`}
      >
        Completed
      </button>
      <button
        onClick={() => setActiveBtn("due")}
        className={`px-3 py-2 text-lg font-semibold rounded-lg transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
          activeBtn === "due"
            ? "border-0 bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800"
            : "border-2 border-purple-600 text-purple-600 bg-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 active:border-purple-700"
        }`}
      >
        Due
      </button>
    </div>
  );
};

export default Tabs;
