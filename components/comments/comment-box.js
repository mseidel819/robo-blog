import Comment from "./comment";
import styles from "./comment-box.module.css";
import { DUMMY_COMMENTS } from "@/DUMMY_COMMENTS";

const CommentBox = ({ slug, comments, upvote }) => {
  const filteredComments = comments.filter(
    (comment) => comment.articleId === slug
  );
  filteredComments.sort((a, b) => b.score - a.score);

  return (
    <div className={styles.content}>
      {filteredComments.map((comment) => (
        <Comment key={comment._id} data={comment} upvote={upvote} />
      ))}
    </div>
  );
};

export default CommentBox;
