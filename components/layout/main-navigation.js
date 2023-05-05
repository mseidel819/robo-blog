import Link from "next/link";
import Logo from "./logo";
import styles from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import Hamburger from "../ui/hamburger/hamburger";
const MainNavigation = () => {
  const { data: session, status } = useSession();

  const [width, setWidth] = useState();
  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  console.log(width);
  const logoutHandler = () => {
    signOut();
  };
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Logo />
        </Link>
        {width && width < 700 && <Hamburger />}

        {width && width >= 700 && (
          <nav>
            <ul>
              <li>
                <Link href="/posts">Posts</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              {!session && status !== "loading" && (
                <li>
                  <Link href="/auth">Login</Link>
                </li>
              )}

              {session && (
                <li>
                  <Link href="/profile">Profile</Link>
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
        )}
      </header>
    </>
  );
};

export default MainNavigation;
