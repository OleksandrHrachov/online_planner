import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITodoState, ITodo } from "./types";

const initialState: ITodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    initState(state, action: PayloadAction<ITodo[] | []>) {
      state.todos = action.payload;
    },
    addToDo(state, action: PayloadAction<ITodo>) {
      state.todos.push(action.payload);
    },
    updateToDo(state, action: PayloadAction<ITodo>) {
      const todo = state.todos.find(
        (todo) => todo._id === action.payload._id
      );

      if (todo) {
        todo._id = action.payload._id;
        todo.title = action.payload.title;
        todo.description = action.payload.description;
        todo.date = action.payload.date;
        todo.time = action.payload.time;
        todo.createdAt = '';
        todo.updatedAt = action.payload.updatedAt;
        todo.checked = action.payload.checked;
      }

    },
    removeToDo(state, action: PayloadAction<string>) {
      state.todos = state.todos.filter(todos => todos._id !== action.payload)
    },
  },
});

export const { addToDo, initState, updateToDo, removeToDo } = todoSlice.actions;
export default todoSlice.reducer;
