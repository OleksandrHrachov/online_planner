import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./CreateTodoModal.scss";
import { useAppDispatch } from "../../hooks";
import { addToDo } from "../../store/todoSlice";
import { closeModal } from "../../store/modalSlice";
import moment from "moment";
import { CREATE_MODAL } from "../../store/types";
import { MAX_YEAR, MIN_YEAR } from "../../const";
import { ApiStorageService } from "../../services/ApiStorageService";

interface IForm {
  title: string;
  description: string;
  date: string;
  time: string;
}

export const CreateTodoModal = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
    watch,
    getValues,
  } = useForm<IForm>({
    defaultValues: { title: "", description: "" },
  });

  const submitSuccess: SubmitHandler<IForm> = async (data) => {
    try {
      data.date = data.date.split("-").reverse().join("-");
      const newTodo = {
        title: data.title,
        description: data.description || "",
        date: data.date,
        time: data.time || "",
        createdAt: moment().format("DD-MM-YYYY HH:mm"),
        updatedAt: "",
        checked: false,
      };

      const response = await ApiStorageService.saveTodo(newTodo);

      if (response) {
        dispatch(addToDo(response));

        reset();
        dispatch(closeModal(CREATE_MODAL));
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      if (error) {
        setTimeout(() => {
          setError("");
          dispatch(closeModal(CREATE_MODAL));
        }, 3000);
      }
    }
  };

  const onCloseModal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(closeModal(CREATE_MODAL));
  };

  return (
    <div onClick={(e) => onCloseModal(e)} className="modal">
      <div className="modal__body" onClick={(e) => e.stopPropagation()}>
        <div
          onClick={(e) => onCloseModal(e)}
          className="modal__close-modal-button"
        >
          <div className="modal__close-modal-button-item-1"></div>
          <div className="modal__close-modal-button-item-2"></div>
        </div>

        {error && <h3 className="modal__body-title--error">{error}</h3>}

        <h3 className="modal__body-title">Add new TODO</h3>
        <form id="addTodo" onSubmit={handleSubmit(submitSuccess)}>
          <label className="modal__todo-title-label">
            <p>Todo*</p>
            <input
              className={`modal__todo-title-text ${
                errors.title ||
                (touchedFields.title && getValues("title").length === 0)
                  ? "required"
                  : ""
              }`}
              type="text"
              {...register("title", { required: true })}
            />
          </label>
          <label className="modal__todo-description-label">
            <p>Description</p>
            <textarea
              className="modal__todo-description-text"
              rows={5}
              {...register("description")}
            />
          </label>
          <div className="modal__todo-period">
            <label className="modal__todo-period-date-lable">
              <p>Date*</p>
              <input
                className={`modal__todo-period-date-value ${
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

            <label className="modal__todo-period-time-lable">
              <p>Time</p>
              <input
                className="modal__todo-period-time-value"
                type="time"
                {...register("time")}
              />
            </label>
          </div>
          <div className="modal__todo-button-container">
            <p>* required</p>
            <button
              className="modal__todo-save-button"
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
        </form>
      </div>
    </div>
  );
};
