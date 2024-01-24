import { FC } from "react";
import "./TodoItem.scss";
import { ITodo } from "../../store/types";
import {useAppDispatch} from '../../hooks';
import {openModal, closeModal} from '../../store/modalSlice';
import {EDIT_TODO_MODAL, LIST_TODOS_MODAL} from '../../store/types';
import {setSelectedTodoId} from '../../store/selectedDaySlice';

interface IProps {
  todo: ITodo;
}

export const TodoItem: FC<IProps> = ({ todo }) => {
  const { title} = todo;
  const dispatch = useAppDispatch();

  const handlerClick = () => {
    dispatch(closeModal(LIST_TODOS_MODAL));
    dispatch(openModal(EDIT_TODO_MODAL));
    dispatch(setSelectedTodoId(todo));
  }

  return <div onClick={handlerClick}>{title}</div>;
};
