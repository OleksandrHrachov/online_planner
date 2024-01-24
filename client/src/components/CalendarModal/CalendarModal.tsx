import { useState } from "react";
import "./CalendarModal.scss";
import moment from "moment";
import { MAX_YEAR, MIN_YEAR } from "../../const";
import { useAppDispatch } from "../../hooks";
import { setSelectedtDate } from "../../store/dateSlice";
import { closeModal } from "../../store/modalSlice";
import { CALENDAR_MODAL } from "../../store/types";

export const CalendarModal = () => {
  const dispatch = useAppDispatch();
  const [selectedYear, setSelectedYear] = useState(moment());

  const months = [...Array(12)].map((_, index) =>
    moment().month(0).add(index, "month").format("MMM")
  );

  const prevYear = () => {
    if (selectedYear.format("YYYY") === MIN_YEAR) {
      const nextYear = selectedYear.clone().year(Number(MAX_YEAR));
      setSelectedYear(nextYear);
    } else {
      const nextYear = selectedYear.clone().subtract(1, "year");
      setSelectedYear(nextYear);
    }
  };

  const nextYear = () => {
    if (selectedYear.format("YYYY") === MAX_YEAR) {
      const nextYear = selectedYear.clone().year(Number(MIN_YEAR));
      setSelectedYear(nextYear);
    } else {
      const nextYear = selectedYear.clone().add(1, "year");
      setSelectedYear(nextYear);
    }
  };

  const handlerMonthClick = (month: string) => {
    dispatch(setSelectedtDate(moment(`1-${month}-${selectedYear.format("YYYY")}`).format()));
    dispatch(closeModal(CALENDAR_MODAL));
  };

  const createMonthItem = (monthName: string) => {
    return (
      <div
        key={monthName}
        className="calendar-modal__months-item"
        onClick={() => handlerMonthClick(monthName)}
      >
        {monthName}
      </div>
    );
  };

  return (
    <div className="calendar-modal">
      <div className="calendar-modal__year">
        <button
          className="calendar-modal__year-button"
          type="button"
          onClick={prevYear}
        >
          &lt;
        </button>
        <div className="calendar-modal__year-selected">
          {selectedYear.format("YYYY")}
        </div>
        <button
          className="calendar-modal__year-button"
          type="button"
          onClick={nextYear}
        >
          &gt;
        </button>
      </div>

      <div className="calendar-modal__months">
        {months.map(createMonthItem)}
      </div>
    </div>
  );
};
