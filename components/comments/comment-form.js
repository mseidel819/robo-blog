import styles from "./comment-form.module.css";
import { useRef, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import Image from "next/image";

const CommentForm = ({ slug, addComment }) => {
  const inputFormContent = useRef();
  const [userSession, setUserSession] = useState();
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setUserSession(session);
      }
    });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const commentDate = new Date();

    const comment = {
      articleId: slug,
      content: inputFormContent.current.value,
      createdAt: commentDate,
      score: 0,
      user: {
        username: userSession.user.name,
        email: userSession.user.email,
      },
      replies: [],
    };

    addComment(comment);
    inputFormContent.current.value = "";
  };

  if (userSession) {
    return (
      <div className={styles.content}>
        <div className={styles.image}>
          {userSession && (
            <Image
              src={`https://robohash.org/${userSession.user.name}?size=106x106`}
              height={66}
              width={66}
              alt={userSession.user.name}
            />
          )}
        </div>
        <form className={styles.form} onSubmit={submitHandler}>
          <textarea
            className={styles.textarea}
            rows="3"
            placeholder="add a comment..."
            ref={inputFormContent}></textarea>
          <button className={styles.button}>Send</button>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <p>log in to leave a comment</p>
    </div>
  );
};

export default CommentForm;
