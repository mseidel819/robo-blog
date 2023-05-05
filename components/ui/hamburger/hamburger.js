// import MobileNav from "@/components/layout/mobile-navigation";
import styles from "./hamburger.module.css";
import Link from "next/link";
import { useState, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

const Hamburger = () => {
  const [active, setActive] = useState(false);
  const checkBoxStatus = useRef();
  // console.log(checkBoxStatus.current.checked);
  const { data: session, status } = useSession();

  const bar1 = `${styles.bars} ${styles.bar1}`;
  const bar2 = `${styles.bars} ${styles.bar2}`;
  const bar3 = `${styles.bars} ${styles.bar3}`;

  const activeHandler = () => {
    setActive(!active);

    if (active) checkBoxStatus.current.checked = false;
  };

  const logoutHandler = () => {
    signOut();
    setActive(!active);
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          name="checkbox"
          className={styles.checkbox}
          id="checkbox"
          onChange={activeHandler}
          ref={checkBoxStatus}
        />
        <label htmlFor="checkbox" id="toggle" className={styles.toggle}>
          <div className={bar1} id="bar1"></div>
          <div className={bar2} id="bar2"></div>
          <div className={bar3} id="bar3"></div>
        </label>
        {active && (
          <div onClick={activeHandler} className={styles.container}>
            <div onClick={(e) => e.stopPropagation()} className={styles.module}>
              <nav>
                <ul>
                  <li className={styles.link}>
                    <Link onClick={activeHandler} href="/posts">
                      Posts
                    </Link>
                  </li>
                  <li>
                    <Link onClick={activeHandler} href="/contact">
                      Contact
                    </Link>
                  </li>
                  {!session && status !== "loading" && (
                    <li>
                      <Link onClick={activeHandler} href="/auth">
                        Login
                      </Link>
                    </li>
                  )}

                  {session && (
                    <li>
                      <Link onClick={activeHandler} href="/profile">
                        Profile
                      </Link>
                    </li>
                  )}

                  {session && (
                    <li>
                      <button className={styles.logout} onClick={logoutHandler}>
                        Logout
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Hamburger;
