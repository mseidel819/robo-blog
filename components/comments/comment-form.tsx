import styles from "./comment-form.module.css";
import { useRef, useState, useEffect, FormEvent } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Loader from "../ui/loader/loader";
import { useDispatch } from "react-redux";
import { addToComments } from "@/store/comments/comments.reducer";
import { Comment } from "@/types";

type Props = {
  slug: string;
};

const CommentForm = ({ slug }: Props) => {
  const inputFormContent = useRef<HTMLTextAreaElement>();
  const { data: userSession, status } = useSession();
  const [commentDate, setDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);

  const [width, setWidth] = useState<number | undefined>();
  const dispatch = useDispatch();

  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const addCommentHandler = (commentData: Comment) => {
    setLoading(true);
    fetch(`/api/comments/${slug}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          return res.json();
        }
        const data = await res.json();
        throw new Error(data.message || "something went wrong");
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

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const comment = {
      articleId: slug,
      content: inputFormContent.current.value,
      createdAt: commentDate,
      upvoted: [],
      downvoted: [],
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
              rows={3}
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
              rows={3}
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
