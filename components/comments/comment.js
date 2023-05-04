import styles from "./comment.module.css";
import Image from "next/image";
const Comment = ({ data, upvote }) => {
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

  return (
    <div className={styles.container}>
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
        <span>{formattedDate}</span>
      </div>
      <p className={styles.content}>{data.content}</p>
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
