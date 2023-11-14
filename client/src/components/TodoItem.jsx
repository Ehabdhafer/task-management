import React from "react";
import { useDispatch } from "react-redux";
import { toggleComplete, deleteTodo } from "../redux/todoSlice";

const TodoItem = ({ _id, title, description, due_date, priority, completed }) => {
  const dispatch = useDispatch();

  const handleCompleteClick = async () => {
    try {
      await dispatch(toggleComplete({ _id, completed: !completed }));
    } catch (error) {
      console.error("Error toggling complete:", error);
    }
  };

  const handleDeleteClick = async () => {
    try {
      await dispatch(deleteTodo({ _id }));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "text-red-600";
      case "medium":
        return "text-orange-600";
      case "low":
        return "text-yellow-600";
      default:
        return "";
    }
  };

  return (
    <li className="bg-white shadow-md rounded-md mb-4 p-4 relative">
      <div className="flex justify-between items-center">
        <div>
          <h2 className={`text-xl ${completed ? "line-through" : ""}`}>
            {title}
          </h2>
          <p className="text-gray-600 mb-2">{description}</p>
          <p className="text-gray-600 mb-2">Due Date: {due_date}</p>
          <p className={`${getPriorityColor()} font-semibold`}>{priority}</p>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-3 form-checkbox h-4 w-4 text-blue-500"
            checked={completed}
            onChange={handleCompleteClick}
          />
          <button
            onClick={handleDeleteClick}
            className="absolute top-2 right-2  text-black py-1 px-2 rounded-md hover:bg-red-600 hover:text-white transition duration-300 h-8 w-8"
          >
            x
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
