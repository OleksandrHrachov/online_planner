import { FC, useState, useEffect } from "react";
import "./DatePicker.scss";
import calendarIcon from "../../icons/calendar.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { openModal, closeModal } from "../../store/modalSlice";
import { CALENDAR_MODAL } from "../../store/types";
import { CalendarModal } from "../CalendarModal";

interface IProps {
  prevMonth: () => void;
  nextMonth: () => void;
  month: string;
  year: string;
}

export const DatePicker: FC<IProps> = ({
  prevMonth,
  nextMonth,
  month,
  year,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>(month);
  const [selectedYear, setSelectedYear] = useState<string>(year);

  const { isCalendarModalOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const [showCalendarModal, setShowCalendarModal] =
    useState(isCalendarModalOpen);

  useEffect(() => {
    setShowCalendarModal(isCalendarModalOpen);
  }, [isCalendarModalOpen]);

  const toggle = () => {
    if (isCalendarModalOpen) {
      dispatch(closeModal(CALENDAR_MODAL));
    } else {
      dispatch(openModal(CALENDAR_MODAL));
    }
  };

  useEffect(() => {
    setSelectedMonth(month);
  }, [month]);

  useEffect(() => {
    setSelectedYear(year);
  }, [year]);

  return (
    <div className="date-picker">
      <div className="date-picker__month">
        <button
          className="date-picker__month-button"
          type="button"
          onClick={prevMonth}
        >
          &lt;
        </button>
        <div className="date-picker__month-selected">
          {selectedMonth} {selectedYear}
        </div>
        <button
          className="date-picker__month-button"
          type="button"
          onClick={nextMonth}
        >
          &gt;
        </button>
      </div>
      <div className={`date-picker__date ${showCalendarModal ? 'date-picker__date--open' : ''}`}>
        <img onClick={toggle} src={calendarIcon} alt="calendar" />
      </div>
      {showCalendarModal && <CalendarModal />}
    </div>
  );
};
