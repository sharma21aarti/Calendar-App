// src/components/Calendar.tsx

import React, { useEffect, useState } from "react";
import Popup from "../shared/Popup";
import EventsInput from "../shared/EventsInput";
import "./calendar.css";

interface CalendarProps {
  month: string | null | undefined;
  date: string;
  setNewEvent: React.Dispatch<React.SetStateAction<Event | null>>;
  setLocalData: React.Dispatch<React.SetStateAction<boolean>>;
  holiday: {
    title: string;
    date: string;
  }[];
  setMonth: (month: string | null | undefined) => void;
  setDate: (date: Date) => void;
}
const Calendar: React.FC<CalendarProps> = ({
  date,
  setDate,
  holiday,
  setLocalData,
}) => {
  const [modal, setModal] = useState(false);
  const [EventId, setEventId] = useState<{ title: string; date: string }>({
    title: "",
    date: "",
  });
  const TotSun: Number[] = [];

  const dateObject = new Date(date);

  const daysInMonth = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth() + 1,
    0
  ).getDate();

  const daysInPrevMonth = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth(),
    0
  ).getDate();

  const startDay = new Date(
    dateObject.getFullYear(),
    dateObject.getMonth(),
    1
  ).getDay();

  const prevMonthSunday = daysInPrevMonth - (startDay - 1);

  const sunday = 7 - startDay + 1;
  const totalWeeks = Math.floor((daysInMonth - sunday) / 7);
  const today = new Date(); // Get the current date
  const currentDay = today.getDate(); // Get the day of the month

  if (startDay === 0) {
    TotSun.push(startDay + 1);
  }

  for (let i = 0; i <= totalWeeks; i++) {
    TotSun.push(sunday + i * 7);
  }

  const bankHoliday: Number[] = holiday.map((data) => {
    let a = data.date.split("/");
    return Number(a[1]);
  });

  function formatDate(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based, so add 1
    const year = date.getFullYear();

    // Pad day and month with leading zeros if necessary
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");

    return `${formattedMonth}/${formattedDay}/${year}`;
  }

  function handleCoustomEvent(day: number, month: number, year: number) {
    const resultDate = new Date(year, month, day);
    const formattedDate = formatDate(resultDate);
    setEventId((prev) => ({
      ...prev,
      title: prev.title, // Preserve the existing title
      date: formattedDate,
    }));
    setModal((prev) => !prev);
  }

  return (
    <div className="calendar">
      <div className="header">
        <button
          className="btn-next"
          onClick={() =>
            setDate(
              new Date(dateObject.getFullYear(), dateObject.getMonth() - 1, 1)
            )
          }
        >
          &lt;
        </button>
        <h2>
          {dateObject.toLocaleString("default", { month: "long" })}{" "}
          {dateObject.getFullYear()}
        </h2>
        <button
          className="btn-next"
          onClick={() =>
            setDate(
              new Date(dateObject.getFullYear(), dateObject.getMonth() + 1, 1)
            )
          }
        >
          &gt;
        </button>
      </div>
      <div className="days">
        <ul className="weekday p-0">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <li key={day} className="day-header">
              <span>{day}</span>
            </li>
          ))}
        </ul>

        <ol className="day-grid p-0">
          {Array.from({ length: startDay }, (_, i) => i + 1).map((day) => (
            <li
              key={day}
              className={`${
                prevMonthSunday === daysInPrevMonth - (startDay - day)
                  ? "month=prev empty-day holiday"
                  : "month=prev empty-day"
              }`}
            >
              {daysInPrevMonth - (startDay - day)}
            </li>
          ))}

          {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
            (day, i) => (
              <li
                key={day}
                className={`${
                  TotSun.includes(day) || bankHoliday.includes(day)
                    ? "day holiday"
                    : day === currentDay
                    ? "day today"
                    : "day"
                }`}
                onClick={() =>
                  handleCoustomEvent(
                    day,
                    dateObject.getMonth(),
                    dateObject.getFullYear()
                  )
                }
              >
                {day}
              </li>
            )
          )}
        </ol>
      </div>
      <div></div>
      {modal && (
        <Popup close={setModal} show={modal}>
          <EventsInput
            EventId={EventId}
            setEventId={setEventId}
            setModal={setModal}
            setLocalData={setLocalData}
          />
        </Popup>
      )}
    </div>
  );
};

export default Calendar;
