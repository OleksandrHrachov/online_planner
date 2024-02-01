import type { AppDispatch } from "../../store";
import { addToDo, removeToDo, updateToDo } from "../../store/todoSlice";
import { IRefreshResponse } from "../../store/types";

export const handleRefreshType = (data: IRefreshResponse, func: AppDispatch) => {
  switch (data.type) {
    case "createTodo":
      if (typeof data.todo !== "string") {
        func(addToDo(data.todo));
      }
      break;

    case "updateTodo":
      if (typeof data.todo !== "string") {
        func(updateToDo(data.todo));
      }
      break;

    case "deleteTodo":
      if (typeof data.todo === "string") {
        func(removeToDo(data.todo));
      }
      break;

    default:
      break;
  }
};