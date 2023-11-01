import React, { useState } from "react";
import Holidays from "../shared/Holiday.json";

interface EventProps {
  month: string | null | undefined;
  date: string;
  holiday: {
    title: string;
    date: string;
  }[];
  setMonth: (month: string | null | undefined) => void;
  setDate: (date: Date) => void;
}
const Eventslist: React.FC<EventProps> = ({
  date,

  holiday,
}) => {
  interface Event {
    id: number;
    title: string;
    date: Date;
  }
  const [events, setEvents] = useState<Event[]>([]);
  // const [holiday, setHoliday] = useState(Holidays);

  // const handleAddEvent = () => {
  //   if (newEvent) {
  //     setEvents([...events, newEvent]);
  //     setNewEvent(null);
  //   }
  // };

  const dateObject = new Date(date);

  return (
    <div className="container">
      <div className="header">Event List</div>
      <div>
        {holiday
          .filter((data) => {
            const holidayMonth = new Date(data.date);
            return dateObject.getMonth() === holidayMonth.getMonth();
          })
          .map((filteredData, index) => (
            <div key={index}>
              {filteredData.title}
              {filteredData.date}
              {/* You can include other properties as needed */}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Eventslist;
