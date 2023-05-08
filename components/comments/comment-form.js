import styles from "./comment-form.module.css";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "../ui/loader/loader";

const CommentForm = ({ slug, addComment, loading }) => {
  const inputFormContent = useRef();
  const { data: userSession, status } = useSession();
  const [commentDate, setDate] = useState();

  const [width, setWidth] = useState();
  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    // const commentDate = new Date();

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

  if (userSession && width >= 768) {
    return (
      <div className={styles.content}>
        <div className={styles.image}>
          {userSession && (
            <Image
              src={`https://robohash.org/${userSession.user.name}?size=106x106`}
              height={66}
              width={66}
              // fill
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
          <button className={styles.button}>
            {loading ? <Loader /> : "Send"}
          </button>
        </form>
      </div>
    );
  }

  if (userSession && width < 768) {
    return (
      <div className={styles.content}>
        <form className={styles.form} onSubmit={submitHandler}>
          <textarea
            className={styles.textarea}
            rows="3"
            placeholder="add a comment..."
            ref={inputFormContent}></textarea>

          <div className={styles.mobile_form_submit}>
            <div className={styles.image}>
              {userSession && (
                <Image
                  src={`https://robohash.org/${userSession.user.name}?size=106x106`}
                  height={66}
                  width={66}
                  // fill
                  alt={userSession.user.name}
                />
              )}
            </div>
            <button className={styles.button}>
              {loading ? <Loader /> : "Send"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className={styles.content}>
      <p className="global-p">Log in to leave a comment</p>
    </div>
  );
};

export default CommentForm;
