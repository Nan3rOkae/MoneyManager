import React from "react";
import { Button } from "@nextui-org/react";

export default function Form({
  currentEntry,
  setCurrentEntry,
  handleSubmit,
  generateMinuteOptions,
}) {
    
  return (
    <form
      className="flex flex-col  border-2 border-gray-300 rounded-xl p-8 w-[800px] ml-10 gap-4"
      onSubmit={handleSubmit}>
      <input
        type="date"
        value={currentEntry.date}
        onChange={(e) =>
          setCurrentEntry({ ...currentEntry, date: e.target.value })
        }
        className="max-w-[200px] border-1 border-gray-300 p-4 rounded-xl"
      />
      <div className="border-1 border-gray-300 p-4 rounded-xl ">
        <label className="font-medium">Start Time:</label>
        <select
          value={currentEntry.startTime.hour}
          onChange={(e) =>
            setCurrentEntry({
              ...currentEntry,
              startTime: {
                ...currentEntry.startTime,
                hour: e.target.value,
              },
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

      <div className="border-1 border-gray-300 p-4 rounded-xl ">
        <label className="font-medium">End Time:</label>
        <select
          value={currentEntry.endTime.hour}
          onChange={(e) =>
            setCurrentEntry({
              ...currentEntry,
              endTime: {
                ...currentEntry.endTime,
                hour: e.target.value,
              },
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
              endTime: {
                ...currentEntry.endTime,
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
          value={currentEntry.endTime.period}
          onChange={(e) =>
            setCurrentEntry({
              ...currentEntry,
              endTime: {
                ...currentEntry.endTime,
                period: e.target.value,
              },
            })
          }>
          <option value="AM">AM</option>
          <option value="PM">PM</option>
        </select>
      </div>

      <input
        type="number"
        value={currentEntry.tips}
        onChange={(e) =>
          setCurrentEntry({ ...currentEntry, tips: e.target.value })
        }
        placeholder="$ Tips"
        className="max-w-[200px] border-1 border-gray-300 p-4 rounded-xl"
      />
      <div className="flex justify-center mt-4">
        <Button color="primary" className="w-[20%] p-[30px]" type="submit">
          Submit
        </Button>
      </div>
    </form>
  );
}
