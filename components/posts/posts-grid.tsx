import styles from "./posts-grid.module.css";
import PostItem from "./post-item";
import { PostData } from "@/types";

type Props = {
  posts: PostData[];
};

const PostGrid = ({ posts }: Props) => {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostGrid;
