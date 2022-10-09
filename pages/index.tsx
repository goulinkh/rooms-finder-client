import type { NextPage } from "next";
import { useState } from "react";
import { Header } from "../components/Header";
import { PlanningForm } from "../components/PlanningForm";
import { config } from "../config";
import { BuildingsProvider } from "../providers/Buildings";

const getScheduleColor = (startDate: string, endDate: string) => {
  const availableHours =
    (new Date(endDate).getTime() - new Date(startDate).getTime()) /
    (1000 * 60 * 60);
  const maxHours = 12.25;
  const percentage = (availableHours * 100) / maxHours;
  console.log(percentage);
  const hue = Math.floor((percentage * 120) / 100); // go from green to red
  return `hsl(${hue} 60% 28%)`;
};

const Home: NextPage = () => {
  const [freeRooms, setFreeRooms] = useState<
    { room: string; freeSchedules: { start: string; end: string }[] }[]
  >([]);
  const onSearchSubmit = (form: any) => {
    getFreeRooms({ setFreeRooms, ...form });
  };

  return (
    <BuildingsProvider>
      <div className="root">
        <Header />
        <main className="container">
          <PlanningForm onSubmit={onSearchSubmit} />
          <ul>
            {freeRooms && freeRooms.length
              ? freeRooms.map((r) => (
                  <li key={r.room}>
                    <p style={{ fontWeight: "bold" }}> {r.room}</p>
                    <ul>
                      {r.freeSchedules.map((s) => (
                        <li
                          key={s.start}
                          style={{
                            margin: ".3rem 0",
                            color: getScheduleColor(s.start, s.end),
                          }}
                        >
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
        </main>
        <footer className="container">
          <iframe
            src="https://rooms-finder.instatus.com/embed-status/light-sm"
            width="230"
            height="61"
            frameBorder="0"
            scrolling="no"
            style={{ border: "none" }}
          ></iframe>
        </footer>
      </div>
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
