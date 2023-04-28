import styles from "./featured-posts.module.css";
import PostGrid from "../posts/posts-grid";
import GlitchButton from "../ui/button";
import Link from "next/link";
const FeaturedPosts = ({ posts }) => {
  return (
    <section className={styles.latest}>
      <h2>Featured Posts</h2>
      <div className={styles.button}>
        <Link href="/posts">
          <GlitchButton>See all posts</GlitchButton>
        </Link>
      </div>

      <PostGrid posts={posts} />
    </section>
  );
};

export default FeaturedPosts;
