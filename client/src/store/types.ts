export interface ITodo {
  _id?: string;
  title: string;
  description: string | '';
  date: string;
  time: string | '';
  createdAt: string | '';
  updatedAt: string | '';
  checked: boolean;
}

export interface ITodoState {
  todos: ITodo[];
}

export interface IUpdateData {
  selectedDay: string | null;
  todo: ITodo;
}

export const CREATE_MODAL = "createModal";
export const EDIT_TODO_MODAL = "editTodoModal";
export const CALENDAR_MODAL = "calendarModal";

export type MODAL_TYPE =
  | typeof CREATE_MODAL
  | typeof EDIT_TODO_MODAL
  | typeof CALENDAR_MODAL;

export interface IModalState {
  isCreateModalOpen: boolean;
  isEditTodoModalOpen: boolean;
  isCalendarModalOpen: boolean;
}

export interface ISelectedDayState {
  selectedDay: string | null;
  selectedTodo?: ITodo | null;
}
