import styles from "./comment-form.module.css";
import { useRef, useState, useEffect } from "react";
import { getSession } from "next-auth/react";

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
        <div className={styles.image}></div>
        <form className={styles.form} onSubmit={submitHandler}>
          <textarea
            className={styles.textarea}
            rows="5"
            ref={inputFormContent}></textarea>
          <button>send</button>
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
