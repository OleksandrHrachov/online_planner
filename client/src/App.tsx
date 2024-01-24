import { useState, useEffect, useCallback } from "react";
import "./App.scss";
import { CalendarBody } from "./components/CalendarBody";
import { CalendarHeader } from "./components/CalendarHeader";
import { CreateTodoModal } from "./components/CreateTodoModal";
import moment from "moment";
import { useAppSelector, useAppDispatch } from "./hooks";
import { ListTodosModal } from "./components/ListTodosModal";
import { EditTodoModal } from "./components/EditTodoModal";
import { ApiStorageService } from "./services/ApiStorageService";
import { initState } from "./store/todoSlice";
import { BackgroundOverlay } from "./components/BackgroundOverlay";
import {
  setCurrentDate as setCurrentDateState,
  setSelectedtDate,
} from "./store/dateSlice";

function App() {
  const { modal, date } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  moment.updateLocale("en", { week: { dow: 1 } });

  const startData = moment().startOf("month").startOf("week");
  const endDate = moment().endOf("month").endOf("week");

  const [currentDate, setCurrentDate] = useState<string>("");
  const [startListDay, setStartListDay] = useState(startData);
  const [endListDay, setEndListDay] = useState(endDate);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const getStorageState = async () => {
    setIsLoading(true);
    try {
      const calendarFilter = await ApiStorageService.getDateFilterState();
      const state = await ApiStorageService.getTodos();

      dispatch(initState(state));
      dispatch(setCurrentDateState(calendarFilter));
      dispatch(setSelectedtDate(calendarFilter));
      if (calendarFilter) {
        setCurrentDate(calendarFilter);
      } else {
        setCurrentDate(moment().format());
      }
    } catch (error) {
      setError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getStorageState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (date.selectedDate) {
      setCurrentDate(moment(date.selectedDate).format());

      dispatch(setCurrentDateState(date.selectedDate));
      setStartListDay(
        moment(date.selectedDate).clone().startOf("month").startOf("week")
      );
      setEndListDay(
        moment(date.selectedDate).clone().endOf("month").endOf("week")
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date.selectedDate]);

  useEffect(() => {
    if (currentDate) {
      dispatch(setSelectedtDate(currentDate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDate]);

  const prevMonth = useCallback(() => {
    if (currentDate) {
      if (moment(currentDate).month() === 0) {
        const nextMonth = moment(currentDate).clone().month(11);
        setCurrentDate(nextMonth.format());
      } else {
        const nextMonth = moment(currentDate).clone().subtract(1, "month");
        setCurrentDate(nextMonth.format());
      }
    }
  }, [currentDate]);

  const nextMonth = useCallback(() => {
    if (currentDate) {
      if (moment(currentDate).month() === 11) {
        const nextMonth = moment(currentDate).clone().month(0);
        setCurrentDate(nextMonth.format());
      } else {
        const nextMonth = moment(currentDate).clone().add(1, "month");
        setCurrentDate(nextMonth.format());
      }
    }
  }, [currentDate]);

  return (
    <div className="calendar">
      <div className="calendar__inner">
        <div className="calendar__header-wrapper">
          <CalendarHeader
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            month={moment(currentDate).format("MMMM")}
            year={moment(currentDate).format("YYYY")}
          />
        </div>
        <div className="calendar__body-wrapper">
          <div className="calendar__body-selected-day">TODO List</div>
          <div className="calendar__body-calendar">
            <CalendarBody firstDay={startListDay} lastDay={endListDay} />
          </div>
        </div>
      </div>
      {modal.isCreateModalOpen && <CreateTodoModal />}
      {modal.isListTodosModalOpen && <ListTodosModal />}
      {modal.isEditTodoModalOpen && <EditTodoModal />}
      {modal.isCalendarModalOpen && <BackgroundOverlay />}
      {isLoading && (
        <BackgroundOverlay
          color="#777575"
          title="Don't panic, the calendar is loading..."
        />
      )}
      {error && (
        <BackgroundOverlay
          color="rgba(204, 0, 0, 1)"
          title="Time to panic, an error has occurred!!!"
        />
      )}
    </div>
  );
}

export default App;
