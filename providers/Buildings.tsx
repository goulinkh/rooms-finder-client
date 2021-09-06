import React, { createContext, Provider, ReactNode, useState } from "react";

export type BuildingsContextType = {
  buildings: {
    buildings: any[];
    setBuildings: any;
  };
  rooms: {
    rooms: any[];
    setRooms: any;
  };
};

export const BuildingsContext = createContext<BuildingsContextType>(
  null as any
);

export const BuildingsProvider = ({
  children = null,
}: {
  children?: ReactNode;
}) => {
  const [buildings, setBuildings] = useState([]);
  const [rooms, setRooms] = useState([]);
  return (
    <BuildingsContext.Provider
      value={{
        buildings: { buildings, setBuildings },
        rooms: { rooms, setRooms },
      }}
    >
      {children}
    </BuildingsContext.Provider>
  );
};
