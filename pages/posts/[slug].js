import CommentBox from "@/components/comments/comment-box";
import CommentForm from "@/components/comments/comment-form";
import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "@/lib/posts-util";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setComments } from "@/store/comments/comments.reducer";

const PostDetailPage = ({ post }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchComments = () => {
    setLoading(true);
    fetch(`/api/comments/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setComments(data.data));
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchComments(slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
      <CommentBox slug={post.slug} loading={loading} />

      <CommentForm loading={loading} slug={post.slug} />
    </>
  );
};

export const getStaticProps = (context) => {
  const { params } = context;

  const postData = getPostData(params.slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths = () => {
  const postFileNames = getPostFiles();

  const slugs = postFileNames.map((file) => file.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
};

export default PostDetailPage;
