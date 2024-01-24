import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { ApiStorageService } from '../services/ApiStorageService';

interface IDateState {
  currentDate: string;
  selectedDate: string | null;
}

const initialState: IDateState = {
  currentDate: moment().format(),
  selectedDate: null,
};

const dateSlice = createSlice({
  name: "dateSlice",
  initialState,
  reducers: {
    setCurrentDate(state, action: PayloadAction<string>) {
      state.currentDate = action.payload;
    },
    setSelectedtDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
      if (action.payload) {
        ApiStorageService.saveDateFilterState(action.payload);
      }
    },
  },
});

export const { setCurrentDate, setSelectedtDate } = dateSlice.actions;

export default dateSlice.reducer;
