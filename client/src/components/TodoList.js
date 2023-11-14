import React from "react";
import TodoItem from "./TodoItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchTodos } from "../redux/todoSlice";

const TodoList = () => {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem
          _id={todo._id}
          title={todo.title}
          completed={todo.completed}
          priority={todo.priority}
          due_date={todo.due_date}
          description={todo.description}
        />
      ))}
    </ul>
  );
};

export default TodoList;
