import Calendar from "./Calendar";
import Eventslist from "./Eventslist";
import "bootstrap/dist/css/bootstrap.min.css";
import Holidays from "../shared/Holiday.json";
import React, { Suspense } from "react";

// import Navbar from "../shared/Navbar";

import LineChart from "./LineChart";
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const Home: React.FC = () => {
  const [month, setMonth] = useState<string | null | undefined>(null);
  const [date, setDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState<Event | null>(null);
  const [holiday, setHoliday] = useState<{ title: string; date: string }[]>([]);
  const [localData, setLocalData] = useState<boolean>(false);
  const dateString = date.toISOString();
  const dateObject = new Date(date);

  const Navbar = useMemo(
    () => React.lazy(() => import(`../shared/Navbar`)),
    []
  );

  const EventLocalStrg = localStorage.getItem("coustomEvents");
  let EventHolidaay: Array<{ date: string; title: string }> = [];

  if (EventLocalStrg) {
    EventHolidaay = JSON.parse(EventLocalStrg);
  }

  const filterHoliday = () => {
    const bankHoliday = Holidays.filter((data) => {
      const holidayMonth = new Date(data.date);
      return dateObject.getMonth() === holidayMonth.getMonth();
    });
    setHoliday(bankHoliday);
  };
  const filterCoustomHoliday = () => {
    const bankHoliday = EventHolidaay.filter((data) => {
      const holidayMonth = new Date(data.date);
      return dateObject.getMonth() === holidayMonth.getMonth();
    });
    setHoliday((prev) => [...prev, ...bankHoliday]);
  };

  useEffect(() => {
    filterHoliday();
    filterCoustomHoliday();
  }, [date, localData]);

  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <div className="App">
        <Navbar />
        <div className="row">
          <div className="col-lg-6">
            <Calendar
              date={dateString}
              holiday={holiday}
              setNewEvent={setNewEvent}
              setLocalData={setLocalData}
              setDate={setDate}
              month={month}
              setMonth={setMonth}
            />
          </div>
          <div className="col-lg-6">
            <Eventslist
              date={dateString}
              holiday={holiday}
              setDate={setDate}
              month={month}
              setMonth={setMonth}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default Home;
