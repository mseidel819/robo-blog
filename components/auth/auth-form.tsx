import { useState, useRef, useEffect, FormEvent } from "react";
import { signIn } from "next-auth/react";
import classes from "./auth-form.module.css";
import { useRouter } from "next/router";
import Notification from "../ui/notification";

const createUser = async (
  email: string,
  password: string,
  username: string
) => {
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
  const emailInpufRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const usernameInpufRef = useRef<HTMLInputElement>();
  const [isLogin, setIsLogin] = useState(true);
  const [requestStatus, setRequestStatus] = useState<
    "pending" | "error" | "success" | "login error" | "signin" | "signup"
  >();
  const [requestError, setRequestError] = useState<string | undefined>();
  //processing, success, error
  const router = useRouter();

  useEffect(() => {
    if (
      requestStatus === "success" ||
      requestStatus === "error" ||
      requestStatus === "login error"
    ) {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setRequestStatus("pending");

    const enteredEmail = emailInpufRef.current.value;
    const enteredPasword = passwordInputRef.current.value;

    try {
      if (!isLogin) {
        setRequestStatus("signup");
        const enteredUsername = usernameInpufRef.current.value;

        const result = await createUser(
          enteredEmail,
          enteredPasword,
          enteredUsername
        );
      }
      setRequestStatus("signin");

      const result2 = await signIn("credentials", {
        redirect: false,
        email: enteredEmail,
        password: enteredPasword,
      });
      if (!result2.error) {
        setRequestStatus("success");

        router.replace("/profile");
      } else {
        setRequestStatus("login error");
      }
    } catch (err) {
      setRequestError(err.message);

      setRequestStatus("error");

      console.log("oops", err);
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "processing...",
      message: "your message is on its way",
    };
  }
  if (requestStatus === "signup") {
    notification = {
      status: "pending",
      title: "Signing up...",
      message: "Your profile is being created",
    };
  }
  if (requestStatus === "signin") {
    notification = {
      status: "pending",
      title: "Signing in...",
      message: "Signing into your account",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success",
      message: "Sign in Succesful!",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }
  if (requestStatus === "login error") {
    notification = {
      status: "error",
      title: "Error",
      message: "Incorrect email or password",
    };
  }

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

export default AuthForm;
