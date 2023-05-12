import { useSession } from "next-auth/react";
import ProfileForm from "./profile-form";
import styles from "./user-profile.module.css";
import Image from "next/image";
import Notification from "../ui/notification";
import { useState, useEffect } from "react";
import React from "react";

function UserProfile() {
  const { data: session, update } = useSession();

  const [requestStatus, setRequestStatus] = useState<
    "success" | "error" | "pending" | null
  >();
  const [requestError, setRequestError] = useState<string | null>();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const changeUsernameHandler = async (newUsername) => {
    try {
      const response = await fetch("/api/user/change-username", {
        method: "PATCH",
        body: JSON.stringify({ newUsername }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "error") {
        throw new Error(data.message);
      }
      setRequestStatus("success");
      session.user.name = newUsername;
    } catch (err) {
      setRequestStatus("error");
      setRequestError(err.message);
      console.log(err);
    }
  };

  const changePasswordHandler = async (passwordData) => {
    setRequestStatus("pending");

    try {
      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        body: JSON.stringify(passwordData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.status === "error") {
        throw new Error(data.message);
      }
      setRequestStatus("success");
    } catch (err) {
      setRequestStatus("error");
      setRequestError(err.message);
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Updating...",
      message: "Your profile is being updated",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Updated!",
      message: "Your profile has been updated.",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  if (session) {
    return (
      <section className={styles.profile}>
        <div className={styles.profileImg}>
          {session.user.name && (
            <Image
              priority
              src={`https://robohash.org/${session.user.name}?size=236x236`}
              fill
              alt={session.user.name}
            />
          )}
        </div>
        <h1 className="global-header-1">{session.user.name}&apos;s profile</h1>

        <ProfileForm
          onChangeUsername={changeUsernameHandler}
          onChangePassword={changePasswordHandler}
        />
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </section>
    );
  }
}

export default UserProfile;
