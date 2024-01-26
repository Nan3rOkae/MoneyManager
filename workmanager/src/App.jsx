import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export default function WorkLogPage() {
  const formatDate = (date) => {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [month, day, year].join("-");
  };
  // Load entries from local storage
  const loadEntries = () => {
    const savedEntries = localStorage.getItem("workLogEntries");
    return savedEntries ? JSON.parse(savedEntries) : [];
  };

  // Initialize entries state with data from local storage
  const [entries, setEntries] = useState(loadEntries());
  const [selectedEntryIndex, setSelectedEntryIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
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
    setCurrentEntry({ ...currentEntry, tips: "" });
  };
  const onOpen = (index) => {
    setIsOpen(true);
    setSelectedEntryIndex(index);
  };

  const onClose = () => {
    setIsOpen(false);
    setSelectedEntryIndex(null);
  };

  const deleteEntry = () => {
    setEntries(entries.filter((_, i) => i !== selectedEntryIndex));
    onClose();
  };

  // Save entries to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("workLogEntries", JSON.stringify(entries));
  }, [entries]);

  return (
    <div className="min-w-screen flex flex-col min-h-screen">
      <div className="h-[100px] border-b-3 border-gray-500 flex justify-end">
        Profile auth location
      </div>
      <div className="min-h-[100vh] flex flex-row">
        <div className="w-2/3 flex flex-col border-r-2 border-gray-300">
          <div className="p-4 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-black">Work Time and Tip Manager</h1>
            <p className="text-lg mt-2">
              Enter your work-time and tips for each day you work.
            </p>
          </div>
          <div className="flex justify-center items-center p-3">
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
                <Button
                  color="primary"
                  className="w-[20%] p-[30px]"
                  type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-1/3 max-h-screen overflow-auto">
          <div className="flex justify-center p-2 border-b-2 border-gray-300">
            <h1 className="text-2xl font-black">Work Entries</h1>
          </div>
          {entries.map((entry, index) => (
            <div
              className="border-t-2 border-gray-200 p-4 flex flex-col gap-2"
              key={index}>
              <p>Date: {entry.date}</p>
              <p>
                Start Time: {entry.startTime.hour}:{entry.startTime.minute}{" "}
                {entry.startTime.period}
              </p>
              <p>
                End Time: {entry.endTime.hour}:{entry.endTime.minute}{" "}
                {entry.endTime.period}
              </p>
              <p>Total time: {entry.duration}</p>
              <p>Tips: ${entry.tips}</p>
              <div className="flex mt-6 gap-10">
                <Button color="primary">Edit</Button>
                <Button
                  color="danger"
                  variant="bordered"
                  onPress={() => onOpen(index)}>
                  Delete
                </Button>
              </div>
            </div>
          ))}
          <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Are you sure you want to delete this entry?
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      Once you delete this entry you can no longer have have
                      this saved in the list.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onPress={onClose}>
                      Back
                    </Button>
                    <Button
                      color="danger"
                      variant="light"
                      onClick={deleteEntry}>
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  );
}
