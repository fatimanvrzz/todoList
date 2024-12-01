import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") {
      alert("Tapşırıq boş ola bilməz! Zəhmət olmasa, düzgün tapşırıq daxil edin.");
      return;
    }
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">To-Do List</h1>

       {/* search box */}
        <div className="space-y-2">
          <label htmlFor="search" className="block text-gray-600">
            Search Tasks:
          </label>
          <input  
            id="search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* new task add */}
        <div className="space-y-2">
          <label htmlFor="newTask" className="block text-gray-600">
            Add a New Task:
          </label>
          <div className="flex space-x-2">
            <input
              id="newTask"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Add a new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" onClick={addTask}>
              Add
            </button>
          </div>
        </div>

        {/* task list */}
        <ul className="space-y-2">
          {filteredTasks.map((task, index) => (
            <li key={index} className={`flex justify-between items-center px-4 py-2 ${
             task.completed ? "bg-green-100" : "bg-gray-100"} rounded-md`}>
            <span className={`flex-1 ${task.completed ? "line-through text-gray-500" : ""}`} 
              onClick={() => toggleTask(index)}>
             {task.text}
            </span>
            <button className="ml-4 text-red-500 hover:text-red-700" onClick={() => deleteTask(index)}>
             Delete
            </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
