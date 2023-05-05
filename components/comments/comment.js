import styles from "./comment.module.css";
import Image from "next/image";
import { useSession } from "next-auth/react";
const Comment = ({ data, upvote, deleteCommentHandler }) => {
  const { data: session, status } = useSession();
  // const { user } = session;

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
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
              src={`https://robohash.org/${data.user.username}?size=106x106`}
              height={36}
              width={36}
              alt={data.user.username}
            />
          </div>
          <span className={styles.username}>{data.user.username}</span>
          {session && session.user.email === data.user.email && (
            <span className={styles.you}>you</span>
          )}
          <span className={styles.date}>{formattedDate}</span>
        </div>
        {session && session.user.email === data.user.email && (
          <button className={styles.delete} onClick={deleteHandler}>
            Delete
          </button>
        )}
      </div>
      <p className={styles.content}>{data.content}</p>
      {(!session || (session && session.user.email === data.user.email)) && (
        <div className={styles.action_bar}>
          <div className={styles.upvoter}>
            <span>{data.score}</span>
          </div>
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
