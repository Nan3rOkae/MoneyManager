import React, { useState } from "react";
// Import Next UI Calendar component if necessary
// import { Calendar } from 'next-ui-calendar-component'; // Replace with actual import

export default function WorkLogPage() {
  // Function to format the current date to "YYYY-MM-DD"
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    date: formatDate(new Date()),
    startTime: { hour: "0", minute: "00", period: "AM" },
    endTime: { hour: "0", minute: "00", period: "AM" },
    tips: "",
  });

  const convertTo24Hour = (time) => {
    let hours = parseInt(time.hour);
    let minutes = parseInt(time.minute);
    if (time.period === "PM" && hours < 12) {
      hours += 12;
    } else if (time.period === "AM" && hours === 12) {
      hours = 0;
    }
    return { hours, minutes };
  };

  const calculateDuration = () => {
    const start = convertTo24Hour(currentEntry.startTime);
    const end = convertTo24Hour(currentEntry.endTime);

    let durationHours = end.hours - start.hours;
    let durationMinutes = end.minutes - start.minutes;

    if (durationMinutes < 0) {
      durationMinutes += 60;
      durationHours -= 1;
    }

    if (durationHours < 0 || (durationHours === 0 && durationMinutes < 0)) {
      durationHours += 24;
    }

    return `${durationHours}h ${durationMinutes}m`;
  };

  const generateMinuteOptions = () => {
    const minutes = [];
    for (let i = 0; i < 60; i += 5) {
      minutes.push(i < 10 ? `0${i}` : `${i}`);
    }
    return minutes;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const duration = calculateDuration();
    setEntries([...entries, { ...currentEntry, duration }]);
    setCurrentEntry({ ...currentEntry, tips: "" }); // Reset tips (keep date and time)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Date input */}
        <input
          type="date"
          value={currentEntry.date}
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, date: e.target.value })
          }
        />

        {/* Start Time Dropdown */}
        <div>
          <label>Start Time:</label>
          <select
            value={currentEntry.startTime.hour}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                startTime: { ...currentEntry.startTime, hour: e.target.value },
              })
            }>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={currentEntry.startTime.minute}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                startTime: {
                  ...currentEntry.startTime,
                  minute: e.target.value,
                },
              })
            }>
            {generateMinuteOptions().map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
          <select
            value={currentEntry.startTime.period}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                startTime: {
                  ...currentEntry.startTime,
                  period: e.target.value,
                },
              })
            }>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {/* End Time Dropdown */}
        <div>
          <label>End Time:</label>
          <select
            value={currentEntry.endTime.hour}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                endTime: { ...currentEntry.endTime, hour: e.target.value },
              })
            }>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
              <option key={hour} value={hour}>
                {hour}
              </option>
            ))}
          </select>
          <select
            value={currentEntry.endTime.minute}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                endTime: { ...currentEntry.endTime, minute: e.target.value },
              })
            }>
            {generateMinuteOptions().map((minute) => (
              <option key={minute} value={minute}>
                {minute}
              </option>
            ))}
          </select>
          <select
            value={currentEntry.endTime.period}
            onChange={(e) =>
              setCurrentEntry({
                ...currentEntry,
                endTime: { ...currentEntry.endTime, period: e.target.value },
              })
            }>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        {/* Tips Input */}
        <input
          type="number"
          value={currentEntry.tips}
          onChange={(e) =>
            setCurrentEntry({ ...currentEntry, tips: e.target.value })
          }
          placeholder="Tips"
        />

        <button type="submit">Submit</button>
      </form>

      <div className="entries">
        {entries.map((entry, index) => (
          <div key={index}>
            <p>Date: {entry.date}</p>
            <p>
              Start Time: {entry.startTime.hour}:{entry.startTime.minute}{" "}
              {entry.startTime.period}
            </p>
            <p>
              End Time: {entry.endTime.hour}:{entry.endTime.minute}{" "}
              {entry.endTime.period}
            </p>
            <p>Duration: {entry.duration}</p>
            <p>Tips: ${entry.tips}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
