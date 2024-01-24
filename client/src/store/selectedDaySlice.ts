import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedDayState, ITodo } from "./types";

const initialState: ISelectedDayState = {
  selectedDay: null,
  selectedDayTodos: [],
  selectedTodo: null,
};

const selectedDaySlice = createSlice({
  name: "selectedDaySlice",
  initialState,
  reducers: {
    setSelectedDay(state, action: PayloadAction<ISelectedDayState>) {
      state.selectedDay = action.payload.selectedDay;
      state.selectedDayTodos = action.payload.selectedDayTodos;
    },
    resetSelectedDay(state) {
      state.selectedDay = null;
      state.selectedDayTodos = [];
      state.selectedTodo = null;
    },
    setSelectedTodoId(state, action: PayloadAction<ITodo>) {
      state.selectedTodo = action.payload;
    },
  },
});

export const { setSelectedDay, resetSelectedDay, setSelectedTodoId } = selectedDaySlice.actions;
export default selectedDaySlice.reducer;
