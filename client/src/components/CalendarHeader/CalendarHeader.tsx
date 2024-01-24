import { FC } from "react";
import "./CalendarHeader.scss";
import { DatePicker } from "../DatePicker";
import { useAppDispatch } from "../../hooks";
import { openModal } from "../../store/modalSlice";
import { CREATE_MODAL } from "../../store/types";

interface IProps {
  prevMonth: () => void;
  nextMonth: () => void;
  month: string;
  year: string;
}

export const CalendarHeader: FC<IProps> = ({
  prevMonth,
  nextMonth,
  month,
  year,
}) => {
  const dispatch = useAppDispatch();

  return (
    <div className="calendar__header">
      <div
        onClick={() => {
          dispatch(openModal(CREATE_MODAL));
        }}
        className="calendar__header-open-modal-button"
      >
        <div className="calendar__header-open-modal-button-item-1"></div>
        <div className="calendar__header-open-modal-button-item-2"></div>
      </div>

      <div className="calendar__header-filter">
        <DatePicker
          prevMonth={prevMonth}
          nextMonth={nextMonth}
          month={month}
          year={year}
        />
      </div>
    </div>
  );
};
