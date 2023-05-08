import styles from "./comment.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

const Comment = ({ data, upvote, deleteCommentHandler }) => {
  const { data: session, status } = useSession();
  // const { user } = session;

  const [formattedDate, setDate] = useState();
  const [width, setWidth] = useState();
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

  // const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });
  const upvoteHandler = () => {
    const newScore = data.score + 1;
    const id = data._id;

    upvote(id, newScore);
  };

  const downvoteHandler = () => {
    const newScore = data.score - 1;
    const id = data._id;
    upvote(id, newScore);
  };

  const deleteHandler = () => {
    const id = data._id;

    deleteCommentHandler(id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.author}>
          <div className={styles.userImg}>
            <Image
              src={`https://robohash.org/${data.user.email}?size=106x106`}
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
          <button className={styles.delete} onClick={deleteHandler}>
            Delete
          </button>
        )}
      </div>
      <p className={`global-p ${styles.content}`}>{data.content}</p>
      {(!session || (session && session.user.email === data.user.email)) && (
        <div className={styles.action_bar}>
          <div className={styles.upvoter}>
            <span>{data.score}</span>
          </div>

          {width < 768 && (
            <button className={styles.delete} onClick={deleteHandler}>
              Delete
            </button>
          )}
        </div>
      )}

      {session && session.user.email !== data.user.email && (
        <div className={styles.action_bar}>
          <div className={styles.upvoter}>
            <button className={styles.score_btn} onClick={upvoteHandler}>
              +
            </button>
            <span>{data.score}</span>
            <button className={styles.score_btn} onClick={downvoteHandler}>
              -
            </button>
          </div>
          <div className={styles.add_delete}></div>
        </div>
      )}

      {data.replies.length > 0 &&
        data.replies.map((reply) => (
          <div key={reply._id} className={styles.reply_container}>
            <Comment data={reply} />
          </div>
        ))}
    </div>
  );
};
export default Comment;
