import { useRef } from "react";
import classes from "./profile-form.module.css";

function ProfileForm({ onChangePassword, onChangeUsername }) {
  const newPasswordInput = useRef();
  const oldPasswordInput = useRef();
  const newUsernameInput = useRef();

  const passwordSubmitHandler = (e) => {
    e.preventDefault();

    const enteredOldPassword = oldPasswordInput.current.value;
    const enteredNewPassword = newPasswordInput.current.value;

    onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword,
    });
    newPasswordInput.current.value = "";
    oldPasswordInput.current.value = "";
  };

  const usernameSubmitHandler = (e) => {
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
