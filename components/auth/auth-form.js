import { useState, useRef } from "react";
import { signIn } from "next-auth/react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";

const createUser = async (email, password, username) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password, username }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

function AuthForm() {
  const emailInpufRef = useRef();
  const passwordInputRef = useRef();
  const usernameInpufRef = useRef();
  const [isLogin, setIsLogin] = useState(true);

  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInpufRef.current.value;
    const enteredPasword = passwordInputRef.current.value;

    try {
      if (!isLogin) {
        const enteredUsername = usernameInpufRef.current.value;

        const result = await createUser(
          enteredEmail,
          enteredPasword,
          enteredUsername
        );
      }

      const result2 = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPasword,
      });
      if (!result2.error) {
        router.replace("/profile");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="username"> Create a Username</label>
            <input type="text" id="username" required ref={usernameInpufRef} />
          </div>
        )}
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInpufRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? "Login" : "Create Account"}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
