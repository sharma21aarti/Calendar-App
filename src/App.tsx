import "./App.css";
import Calendar from "./components/Calendar";
import Eventslist from "./components/Eventslist";
import "bootstrap/dist/css/bootstrap.min.css";
import Holidays from "./shared/Holiday.json";
import LineChart from "./components/LineChart";
import { useEffect, useState } from "react";

const App: React.FC = () => {
  const [month, setMonth] = useState<string | null | undefined>(null);
  const [date, setDate] = useState(new Date());
  const [newEvent, setNewEvent] = useState<Event | null>(null);
  const [holiday, setHoliday] = useState<{ title: string; date: string }[]>([]);
  const [localData, setLocalData] = useState<boolean>(false);
  console.log(localData, "setLocalData");
  const dateString = date.toISOString();
  const dateObject = new Date(date);

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
      console.log(
        holiday,
        "1",
        holidayMonth.getMonth(),
        "2",
        dateObject.getMonth(),
        "3"
      );
      return dateObject.getMonth() === holidayMonth.getMonth();
    });
    setHoliday((prev) => [...prev, ...bankHoliday]);
  };

  useEffect(() => {
    filterHoliday();
    filterCoustomHoliday();
  }, [date, localData]);

  return (
    <div className="App">
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
        <div className="col-lg-6">
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default App;
