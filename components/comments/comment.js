import styles from "./comment.module.css";

const Comment = ({ data }) => {
  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className={styles.container}>
      <div className={styles.author}>
        <div className={styles.userImg}></div>
        <span className={styles.username}>{data.user.username}</span>
        <span>{formattedDate}</span>
      </div>
      <p className={styles.content}>{data.content}</p>
      <div className={styles.action_bar}>
        <div className={styles.upvoter}>
          <button className={styles.score_btn}>+</button>
          <span>{data.score}</span>
          <button className={styles.score_btn}>-</button>
        </div>
        <div className={styles.add_delete}>
          <button>reply</button>
        </div>
      </div>
      {data.replies.length > 0 &&
        data.replies.map((reply) => (
          <div key={reply.id} className={styles.reply_container}>
            <Comment data={reply} />
          </div>
        ))}
    </div>
  );
};
export default Comment;
