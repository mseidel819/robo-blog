import Loader from "../ui/loader/loader";
import Comment from "./comment";
import styles from "./comment-box.module.css";
const CommentBox = ({
  slug,
  comments,
  upvote,
  deleteCommentHandler,
  loading,
  UpdateCommentHandler,
}) => {
  const filteredComments = comments
    .filter((comment) => comment.articleId === slug)
    .sort((a, b) => b.createdAt - a.createdAt);

  if (loading) {
    return (
      <div className={styles.content}>
        <div className={styles.loader}>
          <Loader />
        </div>
      </div>
    );
  }

  if (filteredComments.length) {
    return (
      <div className={styles.content}>
        {filteredComments.map((comment) => (
          <Comment
            key={comment._id ?? comment.createdAt}
            data={comment}
            upvote={upvote}
            deleteCommentHandler={deleteCommentHandler}
            UpdateCommentHandler={UpdateCommentHandler}
            loading={loading}
          />
        ))}
      </div>
    );
  }
};

export default CommentBox;
