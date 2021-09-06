import React, { FC, useContext, useEffect, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { config } from "../../config";
import {
  BuildingsContext,
  BuildingsContextType,
} from "../../providers/Buildings";
import { Select } from "../Select";

type Props = {
  onSubmit: any;
};

export const PlanningForm: FC<Props> = ({ onSubmit }) => {
  const { buildings, setBuildings } =
    useContext<BuildingsContextType>(BuildingsContext).buildings;
  const { rooms, setRooms } =
    useContext<BuildingsContextType>(BuildingsContext).rooms;

  // const [time, setTime] = useState("07:45");
  const [date, setDate] = useState(new Date());
  const [building, setBuilding] = useState("");
  const [room, setRoom] = useState("");

  useEffect(() => {
    updateBuildings(setBuildings);
    return undefined;
  }, []);
  useEffect(() => {}, [buildings]);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    if (
      date &&
      building
      // && time
    ) {
      onSubmit({
        date,
        // time,
        room: room || building,
      });
    }
    // reset();
    e.preventDefault();
  };

  const onBuildingChange = (e: { value?: any }) => {
    if (e && e.value) {
      setBuilding(e.value);
      updateRooms(setRooms, e.value);
    }
  };

  const onRoomChange = (e: { value?: any }) => {
    if (e && e.value) {
      setRoom(e.value);
    }
  };

  const reset = () => {
    setBuilding("");
    setRoom("");
    setDate(new Date());
    setRooms([]);
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="search-form">
      <DatePicker
        required={true}
        yearPlaceholder="année"
        monthPlaceholder="mois"
        dayPlaceholder="Jour"
        onChange={(d: Date) => setDate(d)}
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
        options={buildings.map((b) => ({ value: b.name, label: b.name }))}
        placeholder="Bâtiment"
        disabled={!buildings.length}
        onChange={onBuildingChange}
        value={building}
      />
      <Select
        options={rooms.map((r) => ({ value: r.name, label: r.name }))}
        placeholder="Salle"
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
const updateBuildings = async (setBuilding: any) => {
  try {
    setBuilding(await (await fetch(config.buildings)).json());
  } catch (err) {
    console.log("Failed to get buildings list");
  }
};
const updateRooms = async (setRooms: any, building: string) => {
  try {
    setRooms(
      await (await fetch(`${config.rooms}?building=${building}`)).json()
    );
  } catch (err) {
    console.log("Failed to get buildings list");
  }
};
