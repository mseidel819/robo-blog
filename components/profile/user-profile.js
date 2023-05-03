import { getSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";
import { useEffect, useState } from "react";

function UserProfile() {
  const [user, setUser] = useState("");
  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response);
    const data = await response.json();

    // console.log("hrhrghrhg", data);
  };

  useEffect(() => {
    getSession().then((session) => setUser(session.user.name));
  }, []);

  if (user) {
    return (
      <section className={styles.profile}>
        <h1>{user}&apos;s profile</h1>
        <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
    );
  }
}

export default UserProfile;
