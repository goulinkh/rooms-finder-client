import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./style.module.css";

export const Header = () => {
  return (
    <div className={`${styles.header} container`}>
      <NavLink
        to="/"
        isActive={(match, _) => match.isExact}
        className={styles.link + " " + styles.logo}
        activeClassName={styles.activeLink}
      >
        <span style={{ fontSize: "1.1em" }}>∃</span>S, S=Ø
      </NavLink>
      <NavLink
        className={styles.link}
        activeClassName={styles.activeLink}
        to="/doc"
      >
        API Doc
      </NavLink>
    </div>
  );
};
