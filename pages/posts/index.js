import AllPosts from "@/components/posts/all-posts";
import { getAllPosts } from "@/lib/posts-util";
import Head from "next/head";

const AllPostsPage = ({ posts }) => {
  return (
    <>
      <Head>
        <title>&lt;ROBO_BLOGGER&gt;s Blog | Posts</title>
        <meta name="description" content="A list of all programming posts" />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
};

export const getStaticProps = () => {
  const allPosts = getAllPosts();
  return {
    props: {
      posts: allPosts,
    },
  };
};

export default AllPostsPage;
