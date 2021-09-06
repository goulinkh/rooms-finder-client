import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/Header";
import { PlanningForm } from "../components/PlanningForm";
import { config } from "../config";
import { BuildingsProvider } from "../providers/Buildings";

const Home: NextPage = () => {
  const [freeRooms, setFreeRooms] = useState<
    { room: string; freeSchedules: { start: string; end: string }[] }[]
  >([]);
  const onSearchSubmit = (form: any) => {
    getFreeRooms({ setFreeRooms, ...form });
  };

  return (
    <BuildingsProvider>
      <>
        <Header />
        <div className="container">
          <PlanningForm onSubmit={onSearchSubmit} />
          <ul>
            {freeRooms && freeRooms.length
              ? freeRooms.map((r) => (
                  <li key={r.room}>
                    <h2>{r.room}</h2>
                    <ul>
                      {r.freeSchedules.map((s) => (
                        <li key={s.start} style={{ margin: ".2rem 0" }}>
                          {new Date(s.start).toLocaleTimeString(
                            navigator.language,
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}{" "}
                          <span style={{ fontStyle: "italic" }}>
                            jusqu&apos;à{" "}
                          </span>
                          {new Date(s.end).toLocaleTimeString(
                            navigator.language,
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </>
    </BuildingsProvider>
  );
};

export default Home;

const getFreeRooms = async ({
  setFreeRooms,
  date,
  room,
}: {
  setFreeRooms: any;
  date: Date;
  room: string;
}) => {
  try {
    setFreeRooms(
      await (
        await fetch(
          `${config.freeRooms}?date=${new Date(date.getTime() + 1000 * 2 * 3600)
            .toISOString()
            .replace(/T.+/gi, "")}&place=${room}`
        )
      ).json()
    );
  } catch (err) {
    console.log("Failed to get free rooms");
  }
};
