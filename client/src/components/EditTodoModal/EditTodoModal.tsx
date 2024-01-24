import React, { useState } from "react";
import "./EditTodoModal.scss";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { closeModal } from "../../store/modalSlice";
import { EDIT_TODO_MODAL } from "../../store/types";
import { removeToDo, updateToDo } from "../../store/todoSlice";
import moment from "moment";
import { MAX_YEAR, MIN_YEAR } from "../../const";
import { ApiStorageService } from "../../services/ApiStorageService";

interface IForm {
  title: string;
  description: string;
  date: string;
  time: string;
  checked: boolean;
}

export const EditTodoModal = () => {
  const dispatch = useAppDispatch();
  const { selectedTodo } = useAppSelector(
    (state) => state.selectedDay
  );
  const [error, setError] = useState("");

  const date = selectedTodo?.date.split("-").reverse().join("-");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    getValues,
  } = useForm<IForm>({
    defaultValues: {
      title: selectedTodo?.title || "",
      description: selectedTodo?.description || "",
      date: date || "",
      time: selectedTodo?.time || "",
      checked: selectedTodo?.checked,
    },
  });

  const submitSuccess: SubmitHandler<IForm> = async (data) => {
    try {
      data.date = data.date.split("-").reverse().join("-");
      const editedTodo = {
        _id: selectedTodo?._id,
        title: data.title,
        description: data.description || "",
        date: data.date,
        time: data.time || "",
        createdAt: moment().format("DD-MM-YYYY HH:mm"),
        updatedAt: "",
        checked: data.checked,
      };

      const response = await ApiStorageService.updateTodo(editedTodo);

      if (response) {
        dispatch(updateToDo(response));
        reset();
        dispatch(closeModal(EDIT_TODO_MODAL));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      if (error) {
        setTimeout(() => {
          setError("");
          dispatch(closeModal(EDIT_TODO_MODAL));
        }, 3000);
      }
    }
  };

  const handleDelete = async () => {
    if (selectedTodo && selectedTodo._id) {
      try {
        const response = await ApiStorageService.removeTodo(selectedTodo?._id);

        if (response) {
          dispatch(removeToDo(response));
          reset();
          dispatch(closeModal(EDIT_TODO_MODAL));
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      } finally {
        if (error) {
          setTimeout(() => {
            setError("");
            dispatch(closeModal(EDIT_TODO_MODAL));
          }, 3000);
        }
      }
    }
  };

  const onCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(closeModal(EDIT_TODO_MODAL));
  };

  return (
    <div onClick={(e) => onCloseModal(e)} className="edit-modal">
      <div className="edit-modal__body" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={(e) => onCloseModal(e)}
          className="edit-modal__close-modal-button"
        >
          <div className="edit-modal__close-modal-button-item-1"></div>
          <div className="edit-modal__close-modal-button-item-2"></div>
        </div>
        {error && <h3 className="edit-modal__body-title--error">{error}</h3>}
        <h3 className="edit-modal__body-title">
          Edit TODO{" "}
          <span className="edit-modal__body-title-hint">
            {selectedTodo?.updatedAt
              ? `updated at ${selectedTodo.updatedAt}`
              : `created at ${selectedTodo?.createdAt}`}
          </span>
        </h3>
        <form id="addTodo" onSubmit={handleSubmit(submitSuccess)}>
          <label className="edit-modal__todo-title-label">
            <p>Todo*</p>
            <input
              className={`edit-modal__todo-title-text ${
                errors.title ||
                (touchedFields.title && getValues("title").length === 0)
                  ? "required"
                  : ""
              }`}
              type="text"
              {...register("title", { required: true })}
            />
          </label>
          <label className="edit-modal__todo-description-label">
            <p>Description</p>
            <textarea
              className="edit-modal__todo-description-text"
              rows={5}
              {...register("description")}
            />
          </label>
          <div className="edit-modal__todo-period">
            <label className="edit-modal__todo-period-checked-lable">
              <p>Done</p>
              <input
                className="edit-modal__todo-period-checked-value"
                type="checkbox"
                {...register("checked")}
              />
            </label>

            <label className="edit-modal__todo-period-date-lable">
              <p>Date*</p>
              <input
                className={`edit-modal__todo-period-date-value ${
                  errors.date ||
                  (touchedFields.date && getValues("date").length === 0)
                    ? "required"
                    : ""
                }`}
                type="date"
                {...register("date", { required: true })}
                min={`${MIN_YEAR}-01-01`}
                max={`${MAX_YEAR}-12-31`}
              />
            </label>

            <label className="edit-modal__todo-period-time-lable">
              <p>Time</p>
              <input
                className="edit-modal__todo-period-time-value"
                type="time"
                {...register("time")}
              />
            </label>
          </div>
          <div className="edit-modal__todo-button-container">
            <p>* required</p>
            <div className="edit-modal__todo-button-container-inner">
              <button
                onClick={handleDelete}
                className="edit-modal__todo-delete-button"
                type="button"
              >
                DELETE
              </button>
              <button
                className="edit-modal__todo-save-button"
                type="submit"
                disabled={
                  watch("title").length === 0 ||
                  watch("date").length === 0 ||
                  !!errors.title ||
                  !!errors.date
                }
              >
                SAVE
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
