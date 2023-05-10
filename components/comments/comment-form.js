import styles from "./comment-form.module.css";
import { useRef, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "../ui/loader/loader";
import { useDispatch } from "react-redux";
import { addToComments } from "@/store/comments/comments.reducer";

const CommentForm = ({ slug }) => {
  const inputFormContent = useRef();
  const { data: userSession, status } = useSession();
  const [commentDate, setDate] = useState();
  const [loading, setLoading] = useState();

  const [width, setWidth] = useState();
  const dispatch = useDispatch();

  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const addCommentHandler = (commentData) => {
    setLoading(true);
    fetch(`/api/comments/${slug}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) => {
        dispatch(addToComments(data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setLoading(false);
      });
  };

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
    addCommentHandler(comment);
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
          {!loading && (
            <textarea
              className={styles.textarea}
              rows="3"
              placeholder="add a comment..."
              ref={inputFormContent}></textarea>
          )}
          {loading && (
            <div className={styles.formloader}>
              <Loader />
            </div>
          )}
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
          {!loading && (
            <textarea
              className={styles.textarea}
              rows="3"
              placeholder="add a comment..."
              ref={inputFormContent}></textarea>
          )}
          {loading && (
            <div className={styles.formloader}>
              <Loader />
            </div>
          )}

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
