import styles from "./posts-grid.module.css";
import PostItem from "./post-item";
const PostGrid = ({ posts }) => {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
