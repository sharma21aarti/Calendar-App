import React, { useState } from "react";
import { Card, CardBody, CardFooter, CardHeader } from "react-bootstrap";

interface EventProps {
  EventId: { title: string; date: string };
  setEventId: React.Dispatch<
    React.SetStateAction<{ title: string; date: string }>
  >;
  setLocalData: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const EventsInput: React.FC<EventProps> = ({
  EventId,
  setEventId,
  setModal,
  setLocalData,
}) => {
  //   const [title, setTitle] = useState<string>();
  console.log(EventId, "Event");
  function handleSubmit() {
    // Step 1: Retrieve the existing array from local storage
    const storedData = localStorage.getItem("coustomEvents");

    // Step 2: Parse the stored JSON data into a JavaScript array
    const existingArray = storedData ? JSON.parse(storedData) : [];

    // Step 3: Add your new object to the array

    existingArray.push(EventId);

    // Step 4: Stringify the updated array
    const updatedData = JSON.stringify(existingArray);

    // Step 5: Store the updated JSON string back in local storage
    localStorage.setItem("coustomEvents", updatedData);
    setModal(false);
    setLocalData((prev) => !prev);
    setEventId((prev) => ({
      ...prev,
      date: "",
      title: "",
    }));
  }
  return (
    <Card>
      <CardHeader>Please Enter Your Event</CardHeader>
      <CardBody>
        <div className="">
          <label className="mb-3">Event Name</label>
          <input
            type="text"
            className="form-control p-3"
            placeholder="Enter your Event"
            value={EventId.title}
            onChange={(e) =>
              setEventId((prev) => ({
                ...prev,
                date: prev.date,
                title: e.target.value,
              }))
            }
          />
        </div>
      </CardBody>
      <CardFooter>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </CardFooter>
    </Card>
  );
};

export default EventsInput;
