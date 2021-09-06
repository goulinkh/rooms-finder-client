import clsx from "clsx";
import Link from "next/link";
import styles from "./style.module.css";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter();

  return (
    <div className={`${styles.header} container`}>
      <Link href="/">
        <a
          className={clsx(styles.link, styles.logo, {
            [styles.activeLink]: router.pathname === "/",
          })}
          style={{ fontSize: "1.1em" }}
        >
          <span>∃</span> S, S=Ø
        </a>
      </Link>

      <Link href="/doc">
        <a
          className={clsx(styles.link, styles.logo, {
            [styles.activeLink]: router.pathname === "/doc",
          })}
        >
          API Doc
        </a>
      </Link>
    </div>
  );
};
