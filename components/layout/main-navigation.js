import Link from "next/link";
import Logo from "./logo";
import styles from "./main-navigation.module.css";
import { useSession, signOut } from "next-auth/react";

const MainNavigation = () => {
  const { data: session, status } = useSession();

  const logoutHandler = () => {
    signOut();
  };
  return (
    <>
      <header className={styles.header}>
        <Link href="/">
          <Logo />
        </Link>
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
      </header>
    </>
  );
};

export default MainNavigation;
