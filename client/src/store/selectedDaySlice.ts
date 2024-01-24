import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISelectedDayState, ITodo } from "./types";

const initialState: ISelectedDayState = {
  selectedDay: null,
  selectedTodo: null,
};

const selectedDaySlice = createSlice({
  name: "selectedDaySlice",
  initialState,
  reducers: {
    setSelectedDay(state, action: PayloadAction<ISelectedDayState>) {
      state.selectedDay = action.payload.selectedDay;
    },
    resetSelectedDay(state) {
      state.selectedDay = null;
      state.selectedTodo = null;
    },
    setSelectedTodoId(state, action: PayloadAction<ITodo>) {
      state.selectedTodo = action.payload;
    }
  },
});

export const { setSelectedDay, resetSelectedDay, setSelectedTodoId } = selectedDaySlice.actions;
export default selectedDaySlice.reducer;
