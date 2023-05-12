import Loader from "../ui/loader/loader";
import Comment from "./comment";
import styles from "./comment-box.module.css";
import { useSelector } from "react-redux";
import { selectComments } from "@/store/comments/comments.selector";

type Props = {
  slug: string;
  loading: boolean;
};

const CommentBox = ({ slug, loading }: Props) => {
  const comments: Comment[] = useSelector(selectComments);

  let filteredComments: Comment[] = [];

  if (comments) {
    filteredComments = comments
      .filter((comment) => comment.articleId === slug)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
          <Comment
            key={parseInt(comment._id.toHexString(), 16)}
            data={comment}
            loading={loading}
          />
        ))}
      </div>
    );
  }
};

export default CommentBox;
