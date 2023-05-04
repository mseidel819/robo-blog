import { getSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";

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
    getSession().then((session) => setUser(session.user));
  }, []);

  if (user) {
    return (
      <section className={styles.profile}>
        <div className={styles.profileImg}>
          {user.name && (
            <Image
              priority
              src={`https://robohash.org/${user.name}?size=236x236`}
              height={236}
              width={236}
              alt={user.name}
            />
          )}
        </div>
        <h1>{user.name}&apos;s profile</h1>
        <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
    );
  }
}

export default UserProfile;
