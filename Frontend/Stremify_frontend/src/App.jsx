import React from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const App = () => {
  const fetchData = async () => {
    try {
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
      toast.success(`Fetched: ${response.data.title}`);
    } catch {
      toast.error("Failed to fetch data!");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-4">React + TailwindCSS + Flowbite</h1>
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          Fetch Data
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
