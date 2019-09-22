import React, { createContext, useState } from "react";

export const BuildingsContext = createContext();

export const BuildingsProvider = ({ children = null }) => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  return (
    <BuildingsContext.Provider
      value={{ buildings: [buildings, setBuildings], rooms: [rooms, setRooms] }}
    >
      {children}
    </BuildingsContext.Provider>
  );
};
