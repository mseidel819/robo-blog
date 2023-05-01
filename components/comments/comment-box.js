import Comment from "./comment";
import styles from "./comment-box.module.css";
import { DUMMY_COMMENTS } from "@/DUMMY_COMMENTS";

const CommentBox = ({ slug }) => {
  const filteredComments = DUMMY_COMMENTS.filter(
    (comment) => comment.articleId === slug
  );
  filteredComments.sort((a, b) => b.score - a.score);

  return (
    <div className={styles.content}>
      {filteredComments.map((comment) => (
        <Comment key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default CommentBox;
