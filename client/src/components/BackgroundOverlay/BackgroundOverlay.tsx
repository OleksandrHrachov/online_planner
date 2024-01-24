import "./BackgroundOverlay.scss";
import { closeModal } from "../../store/modalSlice";
import { CALENDAR_MODAL } from "../../store/types";
import { useAppDispatch } from "../../hooks";

interface IProps {
  color?: string;
  title?: string;
}

export const BackgroundOverlay = ({
  color = "rgba(148, 145, 145, 0.4)",
  title,
}: IProps) => {
  const dispatch = useAppDispatch();

  const onClose = () => {
    dispatch(closeModal(CALENDAR_MODAL));
  };

  return (
    <div
      onClick={onClose}
      className="background-modal"
      style={{ backgroundColor: color }}
    >
      <h1>{title}</h1>
    </div>
  );
};
