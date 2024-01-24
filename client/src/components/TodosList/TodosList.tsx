import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../hooks";
import { ITodo } from "../../store/types";
import { TodoItem } from "../TodoItem";
import "./TodosList.scss";

export const TodosList = () => {
  const { selectedDay } = useAppSelector((state) => state.selectedDay);
  const allTodos = useAppSelector((state) => state.todos.todos);
  const [todoFilterType, setTodoFilterType] = useState<
    "completed" | "active" | "all"
  >("all");

  const todayTodos = useMemo(() => {
    return allTodos.filter((todo) => todo.date === selectedDay);
  }, [allTodos, selectedDay]);

  const [todosForView, setTodosForView] = useState<ITodo[]>([]);

  const filterTodo = (todos: ITodo[]) => {
    const filteredTodos = todos.filter((todo) => {
      if (todoFilterType === "active") {
        return todo.checked === false;
      } else if (todoFilterType === "completed") {
        return todo.checked === true;
      } else {
        return todo;
      }
    });

    return filteredTodos;
  };

  useEffect(() => {
    const filteredTodos = filterTodo(todayTodos);
    setTodosForView(filteredTodos);
  }, [allTodos, selectedDay]);

  useEffect(() => {
    const filteredTodos = filterTodo(todayTodos);
    setTodosForView(filteredTodos);
  }, [todoFilterType]);

  const createTodoItemTitle = (todoItem: ITodo) => {
    return (
      <li
        key={todoItem._id}
        className={`todo-list__todo-item ${
          todoItem.checked
            ? "todo-list__todo-item--checked"
            : "todo-list__todo-item--no-checked"
        }`}
      >
        <TodoItem todo={todoItem} />
      </li>
    );
  };

  return (
    <>
      <h3 className="todo-list__title">TODOs of {selectedDay}</h3>
      {todayTodos.length > 0 ? (
        <div className="todo-list__todo-wrapper">
          <ul className="todo-list__todo-list">
            {todosForView.map(createTodoItemTitle)}
          </ul>
          <div className="todo-list__btns">
            <button
              onClick={() => setTodoFilterType("all")}
              className={`todo-list__btns-filter todo-list__btns-filter-all ${
                todoFilterType === "all"
                  ? "todo-list__btns-filter-all--active"
                  : ""
              }`}
              type="button"
            >
              all
            </button>
            <button
              onClick={() => setTodoFilterType("active")}
              className={`todo-list__btns-filter todo-list__btns-filter-active ${
                todoFilterType === "active"
                  ? "todo-list__btns-filter-active--active"
                  : ""
              }`}
              type="button"
            >
              active
            </button>
            <button
              onClick={() => setTodoFilterType("completed")}
              className={`todo-list__btns-filter todo-list__btns-filter-completed ${
                todoFilterType === "completed"
                  ? "todo-list__btns-filter-completed--active"
                  : ""
              }`}
              type="button"
            >
              completed
            </button>
          </div>
        </div>
      ) : (
        "No TODOs for this day"
      )}
    </>
  );
};
