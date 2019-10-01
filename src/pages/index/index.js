import React, { useState } from "react";
import { Form } from "./form";
import { PATHS } from "../../config";
export const Index = () => {
  const [freeRooms, setFreeRooms] = useState([]);
  const onSearchSubmit = form => {
    getFreeRooms({ setter: setFreeRooms, ...form });
  };
  return (
    <div className="container">
      <Form onSubmit={onSearchSubmit} />
      <ul>
        {freeRooms && freeRooms.length
          ? freeRooms.map(r => (
              <li key={r.room}>
                <h2>{r.room}</h2>
                <ul>
                  {r.freeSchedules.map(s => (
                    <li key={s.start} style={{ margin: ".2rem 0" }}>
                      {new Date(s.start).toLocaleTimeString(
                        navigator.language,
                        {
                          hour: "2-digit",
                          minute: "2-digit"
                        }
                      )}{" "}
                      <span style={{ fontStyle: "italic" }}>jusqu&apos;à </span>
                      {new Date(s.end).toLocaleTimeString(navigator.language, {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};
const getFreeRooms = async ({ setter, date, room }) => {
  try {
    setter(
      await (await fetch(
        `${PATHS.freeRooms}?date=${new Date(date.getTime() + 1000 * 2 * 3600)
          .toISOString()
          .replace(/T.+/gi, "")}&place=${room}`
      )).json()
    );
  } catch (err) {
    console.log("Failed to get free rooms");
  }
};
