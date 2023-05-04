import Comment from "./comment";
import styles from "./comment-box.module.css";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
const CommentBox = ({ slug, comments, upvote, deleteCommentHandler }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    getSession().then((session) => setUser(session?.user));
  }, []);

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
          user={user}
        />
      ))}
    </div>
  );
};

export default CommentBox;
