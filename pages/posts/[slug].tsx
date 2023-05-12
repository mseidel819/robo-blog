import CommentBox from "@/components/comments/comment-box";
import CommentForm from "@/components/comments/comment-form";
import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "@/lib/posts-util";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setComments } from "@/store/comments/comments.reducer";
import { PostData } from "@/types";
import {
  GetStaticPathsContext,
  GetStaticProps,
  GetStaticPropsContext,
} from "next/types";

type Props = {
  post: PostData;
};

const PostDetailPage: React.FC<Props> = ({ post }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { slug } = router.query;
  const [loading, setLoading] = useState(false);

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
    fetchComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
      <CommentBox slug={post.slug} loading={loading} />

      <CommentForm slug={post.slug} />
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = (
  context: GetStaticPropsContext
) => {
  const { params } = context;

  const postData = getPostData(params.slug as string);

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
