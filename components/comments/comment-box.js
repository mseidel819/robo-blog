import Loader from "../ui/loader/loader";
import Comment from "./comment";
import styles from "./comment-box.module.css";
import { useSelector } from "react-redux";
import { selectComments } from "@/store/comments/comments.selector";

const CommentBox = ({ slug, loading }) => {
  const comments = useSelector(selectComments);
  let filteredComments = [];
  if (comments) {
    filteredComments = comments
      .filter((comment) => comment.articleId === slug)
      .sort((a, b) => b.createdAt - a.createdAt);
  }

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
          <Comment key={comment._id} data={comment} loading={loading} />
        ))}
      </div>
    );
  }
};

export default CommentBox;
