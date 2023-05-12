import { FormEvent, useRef } from "react";
import classes from "./profile-form.module.css";
import React from "react";

type PasswordData = {
  oldPassword: string;
  newPassword: string;
};
type Props = {
  onChangePassword: (passwordData: PasswordData) => void;
  onChangeUsername: (newUsername: string) => void;
};

function ProfileForm({ onChangePassword, onChangeUsername }: Props) {
  const newPasswordInput = useRef<HTMLInputElement>();
  const oldPasswordInput = useRef<HTMLInputElement>();
  const newUsernameInput = useRef<HTMLInputElement>();

  const passwordSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordInput.current!.value;
    const enteredNewPassword = newPasswordInput.current!.value;

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
    newPasswordInput.current.value = "";
    oldPasswordInput.current.value = "";
  };

  const usernameSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    onChangeUsername(newUsernameInput.current.value);
    newUsernameInput.current.value = "";
  };

  return (
    <>
      <form className={classes.form} onSubmit={usernameSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-username">Change Username</label>
          <input type="text" id="new-username" ref={newUsernameInput} />
        </div>

        <div className={classes.action}>
          <button>Change Username</button>
        </div>
      </form>
      <form className={classes.form} onSubmit={passwordSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor="new-password">New Password</label>
          <input type="password" id="new-password" ref={newPasswordInput} />
        </div>
        <div className={classes.control}>
          <label htmlFor="old-password">Old Password</label>
          <input type="password" id="old-password" ref={oldPasswordInput} />
        </div>
        <div className={classes.action}>
          <button>Change Password</button>
        </div>
      </form>
    </>
  );
}

export default ProfileForm;
