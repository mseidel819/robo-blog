import styles from "./comment.module.css";

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

  // const reply = {
  //   articleId: "introductions",
  //   content: " Testtestetetete",
  //   createdAt: "2022-05-01",
  //   score: 2,
  //   user: {
  //     image: {
  //       png: "./images/avatars/image-amyrobson.png",
  //       webp: "./images/avatars/image-amyrobson.webp",
  //     },
  //     username: "marp",
  //     userId: "bot1",
  //   },
  //   replies: [],
  // };
  // const addReplyHandler = async () => {
  //   // console.log(data.articleId, data._id);
  //   const response = await fetch(`/api/comments/${data.articleId}`, {
  //     method: "PATCH",
  //     body: JSON.stringify({ id: data._id, reply }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data1 = await response.json();

  //   console.log("add reply here", data);
  // };

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
          <button className={styles.score_btn} onClick={upvoteHandler}>
            +
          </button>
          <span>{data.score}</span>
          <button className={styles.score_btn} onClick={downvoteHandler}>
            -
          </button>
        </div>
        <div className={styles.add_delete}>
          {/* <button onClick={addReplyHandler}>reply</button> */}
        </div>
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
