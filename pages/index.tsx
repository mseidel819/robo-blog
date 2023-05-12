import Hero from "@/components/home-page/hero";
import FeaturedPosts from "@/components/home-page/featured-posts";
import { getFeaturedPosts } from "@/lib/posts-util";
import Head from "next/head";
import { PostData } from "@/types";

type Props = {
  posts: PostData[];
};

const HomePage = ({ posts }: Props) => {
  return (
    <>
      <Head>
        <title>&lt;ROBO_BLOGGER&gt;s Blog</title>
        <meta name="description" content="A blog about javascript and react" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
};

export const getStaticProps = () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
};

export default HomePage;
