import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";
import Image from "next/image";

function UserProfile() {
  const { data: session, status } = useSession();

  const changePasswordHandler = async (passwordData) => {
    const response = await fetch("/api/user/change-password", {
      method: "PATCH",
      body: JSON.stringify(passwordData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
  };

  if (session) {
    return (
      <section className={styles.profile}>
        <div className={styles.profileImg}>
          {session.user.name && (
            <Image
              priority
              src={`https://robohash.org/${session.user.email}?size=236x236`}
              height={236}
              width={236}
              alt={session.user.name}
            />
          )}
        </div>
        <h1>{session.user.name}&apos;s profile</h1>
        <ProfileForm onChangePassword={changePasswordHandler} />
      </section>
    );
  }
}

export default UserProfile;
