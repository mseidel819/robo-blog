import styles from "./comment-form.module.css";
import { activeUserBot } from "@/DUMMY_COMMENTS";
import { useRef } from "react";

const CommentForm = ({ slug, addComment }) => {
  const inputFormContent = useRef();
  const user = activeUserBot;

  const submitHandler = (e) => {
    e.preventDefault();

    const commentDate = new Date();

    const comment = {
      articleId: slug,
      content: inputFormContent.current.value,
      createdAt: commentDate,
      score: 0,
      user: user,
      replies: [],
    };

    addComment(comment);
    inputFormContent.current.value = "";
  };

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
};

export default CommentForm;
