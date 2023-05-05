import Comment from "./comment";
import styles from "./comment-box.module.css";
const CommentBox = ({ slug, comments, upvote, deleteCommentHandler }) => {
  const filteredComments = comments.filter(
    (comment) => comment.articleId === slug
  );
  filteredComments.sort((a, b) => b.score - a.score);
  return (
    <div className={styles.content}>
      {filteredComments.map((comment) => (
        <Comment
          key={comment._id ?? comment.createdAt}
          data={comment}
          upvote={upvote}
          deleteCommentHandler={deleteCommentHandler}
        />
      ))}
    </div>
  );
};

export default CommentBox;
