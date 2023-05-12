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
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
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
            key={comment._id.toString()}
            data={comment}
            loading={loading}
          />
        ))}
      </div>
    );
  }
};

export default CommentBox;
