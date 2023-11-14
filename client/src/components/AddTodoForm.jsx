import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/todoSlice";
import Modal from "react-modal";

const YourComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium"); // Default priority
  const dispatch = useDispatch();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    // Clear the input fields when closing the modal
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("medium");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      await dispatch(addTodo({ title, description, due_date, priority }));
      closeModal(); // Close the modal after submission
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div>
      {/* ... your other content */}

      <button
        onClick={openModal}
        className="btn btn-primary border border-black mx-2 p-2 rounded-md"
      >
        Add New Task
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                className="mt-1 p-2 border rounded-md w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                className="mt-1 p-2 border rounded-md w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700"
              >
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                className="mt-1 p-2 border rounded-md w-full"
                value={due_date}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <select
                id="priority"
                className="mt-1 p-2 border rounded-md w-full"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="high" className="text-red-600">
                  High
                </option>
                <option value="medium" className="text-yellow-500">
                  Medium
                </option>
                <option value="low" className="text-green-500">
                  Low
                </option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              Add Task
            </button>
            <button
              type="button"
              className="btn btn-secondary ml-2"
              onClick={closeModal}
            >
              Cancel
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default YourComponent;
