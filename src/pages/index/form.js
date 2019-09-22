import React, { useContext, useEffect, useState } from "react";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";

import { BuildingsContext } from "../../providers/buildings";
import { Select } from "../../components/Select";

import { PATHS } from "../../config";

import "./form.css";

// eslint-disable-next-line react/prop-types
export const Form = ({ onSubmit }) => {
  const [buildings, setBuildings] = useContext(BuildingsContext).buildings;
  const [rooms, setRooms] = useContext(BuildingsContext).rooms;
  // const [time, setTime] = useState("07:45");
  const [date, setDate] = useState(new Date());
  const [building, setBuilding] = useState(null);
  const [room, setRoom] = useState(null);

  useEffect(() => {
    updateBuildings(setBuildings);
    return undefined;
  }, []);
  useEffect(() => {}, [buildings]);
  const handleSubmit = e => {
    if (
      date &&
      building
      // && time
    ) {
      onSubmit({
        date,
        // time,
        room: room || building
      });
    }
    reset();
    e.preventDefault();
  };
  const onBuildingChange = e => {
    if (e && e.value) {
      setBuilding(e.value);
      updateRooms(setRooms, e.value);
    }
  };
  const onRoomChange = e => {
    if (e && e.value) {
      setRoom(e.value);
    }
  };
  const reset = () => {
    setBuilding(null);
    setRoom(null);
    setDate(new Date());
    setRooms([]);
  };
  return (
    <form
      onSubmit={handleSubmit}
      method="POST"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap"
      }}
      className="search-form"
    >
      <DatePicker
        required={true}
        yearPlaceholder="année"
        monthPlaceholder="mois"
        dayPlaceholder="Jour"
        onChange={d => setDate(d)}
        value={date}
      />
      {/* <TimePicker
        required={true}
        minTime="07:45:00"
        maxTime="20:00:00"
        hourPlaceholder="Heure"
        minutePlaceholder="minutes"
        onChange={t => setTime(t)}
        value={time}
      /> */}

      <Select
        options={buildings.map(b => ({ value: b.name, label: b.name }))}
        placeholder="Bâtiment"
        disabled={!buildings.length}
        isSearchable={true}
        onChange={onBuildingChange}
        value={building}
      />
      <Select
        options={rooms.map(r => ({ value: r.name, label: r.name }))}
        placeholder="Salle"
        isSearchable={true}
        disabled={!(buildings.length && rooms.length)}
        onChange={onRoomChange}
        value={room}
      />
      <button
        type="submit"
        className={`submit ${building || room ? null : "disable"}`}
      >
        Chercher
      </button>
    </form>
  );
};
const updateBuildings = async setter => {
  try {
    setter(await (await fetch(PATHS.buildings)).json());
  } catch (err) {
    console.log("Failed to get buildings list");
  }
};
const updateRooms = async (setter, building) => {
  try {
    setter(await (await fetch(`${PATHS.rooms}?building=${building}`)).json());
  } catch (err) {
    console.log("Failed to get buildings list");
  }
};
