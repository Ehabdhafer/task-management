import React from "react";
import TodoList from "../components/TodoList";
import TodoItem from "../components/TodoItem";
import TotalCompleteItems from "../components/TotalCompleteItems";
import AddTodoForm from "../components/AddTodoForm";

const Home = () => {
  return (
    <div className="container bg-white p-4 mt-5 mx-auto w-[50%]">
      {/* <h1>My Todo List</h1> */}
      <AddTodoForm />
      <TodoList />
      <TotalCompleteItems />
    </div>
  );
};

export default Home;
