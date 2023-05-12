import { PostData } from "@/types";
import styles from "./all-posts.module.css";
import PostGrid from "./posts-grid";
import React from "react";

type Props = {
  posts: PostData[];
};

const AllPosts = ({ posts }: Props) => {
  return (
    <section className={styles.posts}>
      <h1> All Posts</h1>
      <PostGrid posts={posts} />
    </section>
  );
};

export default AllPosts;
