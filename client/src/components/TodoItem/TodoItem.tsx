import { ChangeEvent, FC, useState } from "react";
import "./TodoItem.scss";
import { ITodo } from "../../store/types";
import { useAppDispatch } from "../../hooks";
import { openModal } from "../../store/modalSlice";
import { EDIT_TODO_MODAL } from "../../store/types";
import { setSelectedTodoId } from "../../store/selectedDaySlice";
import { ApiStorageService } from "../../services/ApiStorageService";
import { removeToDo, updateToDo } from "../../store/todoSlice";

interface IProps {
  todo: ITodo;
}

export const TodoItem: FC<IProps> = ({ todo }) => {
  const { title } = todo;
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const handlerEdit = () => {
    dispatch(openModal(EDIT_TODO_MODAL));
    dispatch(setSelectedTodoId(todo));
  };

  const handleDelete = async () => {
    if (todo && todo._id) {
      try {
        const response = await ApiStorageService.removeTodo(todo._id);

        if (response) {
          dispatch(removeToDo(response));
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        if (error) {
          setTimeout(() => {
            setError("");
          }, 3000);
        }
      }
    }
  };

  const toggleComplete = async (event: ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    try {
      const editedTodo = {
        ...todo,
        checked,
      };

      const response = await ApiStorageService.updateTodo(editedTodo);

      if (response) {
        dispatch(updateToDo(response));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      if (error) {
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };

  return (
    <div className="todo-item">
      <div className="todo-item__left-side">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          onChange={toggleComplete}
          checked={todo.checked}
        />
        <span className={`${todo.checked ? "todo-item__title--checked" : ""}`}>
          {title}
        </span>
      </div>
      <div className="todo-item__right-side">
        <button
          className="todo-item__btn todo-item__btn-edit"
          type="button"
          onClick={handlerEdit}
        >
          edit
        </button>
        <button
          className="todo-item__btn todo-item__btn-delete"
          type="button"
          onClick={handleDelete}
        >
          delete
        </button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};
