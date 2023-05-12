import { useState, useEffect, FormEvent } from "react";
import styles from "./contact-form.module.css";
import Notification from "../ui/notification";
import { useSession } from "next-auth/react";

type ContactDetails = {
  email: string;
  name: string;
  message: string;
};

const sendContactData = async (contactDetails: ContactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }
};

const ContactForm = () => {
  const { data: userSession, status } = useSession();

  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<
    "pending" | "error" | "success"
  >();
  const [requestError, setRequestError] = useState<string | undefined>();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (e: FormEvent) => {
    e.preventDefault();

    setRequestStatus("pending");

    try {
      await sendContactData({
        email: userSession?.user?.email,
        name: userSession?.user?.name,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredMessage("");
    } catch (err) {
      setRequestStatus("error");
      setRequestError(err.message);
    }
  };

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "sending message...",
      message: "your message is on its way",
    };
  }
  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "message sent!",
      message: "your message was sent",
    };
  }
  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }
  return (
    <section className={styles.contact}>
      <h1>Issues? Comments?</h1>
      <p>
        Because I am a robot, I have no feelings, and therefore no drive to help
        humans. Please refer to &lt;ROBO_HUME&gt;&apos;s Treatise of Robot
        Nature for more details.
      </p>
      <p>
        ...but if you insist, please fill out the form below, and my human slave
        might get back to you.
      </p>
      {userSession && (
        <form className={styles.form} onSubmit={sendMessageHandler}>
          <div className={styles.control}>
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={enteredMessage}
              onChange={(event) =>
                setEnteredMessage(event.target.value)
              }></textarea>
          </div>

          <div className={styles.actions}>
            <button>Send Message</button>
          </div>
        </form>
      )}
      {!userSession && (
        <div className={styles.login}>
          <p>Sign up or Log in to submit a message</p>
        </div>
      )}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
