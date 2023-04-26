import styles from "./all-posts.module.css";
import PostGrid from "./posts-grid";

const AllPosts = ({ posts }) => {
  return (
    <section className={styles.posts}>
      <h1> All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
