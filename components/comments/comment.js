import styles from "./comment.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import Loader from "../ui/loader/loader";
import { useDispatch } from "react-redux";
import {
  changeScore,
  commentEdited,
  commentRemoved,
} from "@/store/comments/comments.reducer";
const Comment = ({ data, loading }) => {
  const { data: session, status } = useSession();

  const [formattedDate, setDate] = useState();
  const [editActive, setEditActive] = useState(false);
  const [scoreLoading, setScoreLoading] = useState(false);
  const [width, setWidth] = useState();
  const inputFormContent = useRef();

  const dispatch = useDispatch();

  const resizeHandler = () => setWidth(window.innerWidth);

  useEffect(() => {
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    const formattedDate1 = new Date(data.createdAt).toLocaleDateString(
      "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
    setDate(formattedDate1);
  }, [data.createdAt]);

  const scoreChangeHandler = (id, newScore) => {
    const payload = {
      id,
      newScore,
    };
    setScoreLoading(true);
    fetch(`/api/comments/${data.articleId}`, {
      method: "PATCH",
      body: JSON.stringify({ id, newScore }),
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
        dispatch(changeScore(payload));
        setScoreLoading(false);
      })
      .catch((err) => {
        console.log("error", err);
        setScoreLoading(false);
      });
  };
  const UpdateCommentHandler = (id, newContent) => {
    fetch(`/api/comments/id/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ id, newContent }),
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
        dispatch(commentEdited({ id, newContent }));
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const deleteCommentHandler = (id) => {
    fetch(`/api/comments/id/${id}`, {
      method: "DELETE",
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
        dispatch(commentRemoved(id));
      });
  };

  const upvoteHandler = () => {
    const newScore = data.score + 1;
    const id = data._id;

    scoreChangeHandler(id, newScore);
  };

  const downvoteHandler = () => {
    const newScore = data.score - 1;
    const id = data._id;
    scoreChangeHandler(id, newScore);
  };

  const deleteHandler = () => {
    const id = data._id;

    deleteCommentHandler(id);
  };

  const updateToggler = () => {
    setEditActive(!editActive);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newContent = inputFormContent.current.value;
    const id = data._id;

    UpdateCommentHandler(id, newContent);

    updateToggler();
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.author}>
          <div className={styles.userImg}>
            <Image
              src={`https://robohash.org/${data.user.username}?size=106x106`}
              height={36}
              width={36}
              alt={data.user.username}
            />
          </div>
          <span className={`global-header-3`}>{data.user.username}</span>
          {session && session.user.email === data.user.email && (
            <span className={styles.you}>you</span>
          )}

          <span className={`global-p ${styles.date}`}>{formattedDate}</span>
        </div>
        {session && session.user.email === data.user.email && width >= 768 && (
          <div>
            <button className={styles.update} onClick={updateToggler}>
              Update
            </button>
            <button className={styles.delete} onClick={deleteHandler}>
              Delete
            </button>
          </div>
        )}
      </div>

      {!editActive && (
        <p className={`global-p ${styles.content}`}>{data.content}</p>
      )}
      {editActive && (
        <div>
          <form className={styles.form} onSubmit={submitHandler}>
            <textarea
              className={styles.textarea}
              rows="3"
              defaultValue={data.content}
              ref={inputFormContent}></textarea>

            <div className={styles.mobile_form_submit}>
              <button className={styles.button}>
                {loading ? <Loader /> : "Send"}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className={styles.action_bar}>
        {(!session || (session && session.user.email === data.user.email)) && (
          <div className={styles.upvoter}>
            <span>{data.score}</span>
          </div>
        )}
        {session && session.user.email !== data.user.email && (
          <div className={styles.upvoter}>
            <button className={styles.score_btn} onClick={upvoteHandler}>
              +
            </button>
            {!scoreLoading && <span>{data.score}</span>}
            {scoreLoading && (
              <span>
                <Loader size="24px" color="black" />
              </span>
            )}

            <button className={styles.score_btn} onClick={downvoteHandler}>
              -
            </button>
          </div>
        )}

        {session && session.user.email === data.user.email && width < 768 && (
          <div>
            <button className={styles.update} onClick={updateToggler}>
              Update
            </button>
            <button className={styles.delete} onClick={deleteHandler}>
              Delete
            </button>
          </div>
        )}
      </div>

      {/* {data.replies.length > 0 &&
        data.replies.map((reply) => (
          <div key={reply._id} className={styles.reply_container}>
            <Comment data={reply} />
          </div>
        ))} */}
    </div>
  );
};
export default Comment;
