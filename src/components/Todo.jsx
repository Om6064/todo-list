import { useEffect, useRef, useState } from "react";
import Table from "./Table";
import swal from "sweetalert";

const Todo = () => {
  const inputRef = useRef(null);
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
  const [filter, setFilter] = useState("all");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [textValue, setTextValue] = useState("");

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  useEffect(() => {
      localStorage.setItem("tasks",JSON.stringify(tasks))
  },[tasks])

  const addTask = () => {
    const input = inputRef.current;
    const inputValue = input.value.trim();

    if (!inputValue) {
      swal("Oops!", "Task Is Not Defined!", "error");
      return;
    }

    const newTask = {
      id: Date.now(),
      isComplete: false,
      taskName: inputValue,
    };

    setTasks([...tasks, newTask]);

    input.value = "";
    setTextValue("");
  };

  const clearAll = () => {
    setTasks([]);
  };

  const markAsComplete = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, isComplete: true } : task
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    let updatedTasks = [];

    if (filter === "all") updatedTasks = tasks;
    else if (filter === "pending") updatedTasks = tasks.filter((task) => !task.isComplete);
    else if (filter === "completed") updatedTasks = tasks.filter((task) => task.isComplete);

    setFilteredTasks(updatedTasks);
  }, [tasks, filter]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-300 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h1 className="text-center text-2xl font-bold text-black mb-6">
          ToDo List 📝
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            ref={inputRef}
            onChange={handleInputChange}
            className="flex-grow bg-gray-100 rounded-full px-4 py-2 text-gray-800 border-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter a new task"
          />
          <button
            type="button"
            onClick={addTask}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-200 shadow-md"
          >
            ➕
          </button>
        </div>

        <div className="flex justify-center mb-6 space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${filter === "all"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-800"
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("pending")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${filter === "pending"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-800"
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-4 py-1 rounded-full text-sm font-medium ${filter === "completed"
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-800"
              }`}
          >
            Completed
          </button>
        </div>

        <div className="h-[270px] overflow-scroll">
          {filteredTasks.length === 0 ? (
            <div className="ps-5 pt-5">
              <img src="/nodata(1).png" />
            </div>
          ) : (
            <ul className="space-y-3">
              {filteredTasks.map((task) => (
                <Table
                  key={task.id}
                  id={task.id}
                  name={task.taskName}
                  complete={task.isComplete}
                  onComplete={markAsComplete}
                />
              ))}
            </ul>
          )}
        </div>

        {filteredTasks.length === 0 ? (
          <div className="py-2">
            <div className="p-2"></div>
          </div>
        ) : (
          <div className="text-center py-2">
            <button
              className="bg-red-600 hover:bg-red-700 rounded p-2 text-white"
              onClick={clearAll}
            >
              Delete All
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
