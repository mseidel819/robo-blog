import styles from "./featured-posts.module.css";
import PostGrid from "../posts/posts-grid";
const FeaturedPosts = ({ posts }) => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <PostGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
