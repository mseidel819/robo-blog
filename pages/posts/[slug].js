import CommentBox from "@/components/comments/comment-box";
import CommentForm from "@/components/comments/comment-form";
import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostFiles } from "@/lib/posts-util";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PostDetailPage = ({ post }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/api/comments/${slug}`)
      .then((res) => res.json())
      .then((data) => setComments(data.data));
  }, [slug]);

  const addCommentHandler = (commentData) => {
    fetch(`/api/comments/${slug}`, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((data) => {
          throw new Error(data.message || "something went wrong");
        });
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
      {comments && <CommentBox slug={post.slug} comments={comments} />}
      <CommentForm slug={post.slug} addComment={addCommentHandler} />
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
