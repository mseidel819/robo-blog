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
  const [loading, setLoading] = useState(false);

  const fetchComments = () => {
    fetch(`/api/comments/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        setComments(data.data);
      });
  };

  const addCommentHandler = (commentData) => {
    setLoading(true);
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
        // res.status(201).json({ message: "comment succesfully added!" });
        setComments([...comments, commentData]);
        fetchComments();
        setLoading(false);
      })
      .catch((err) => {
        // res.status(401).json({ message: "Could not add comment" });
        setLoading(false);
      });
  };

  const scoreChangeHandler = (id, newScore) => {
    const prevComments = [...comments];
    const newComments = comments.map((comment) => {
      return comment._id === id ? { ...comment, score: newScore } : comment;
    });
    setComments(newComments);

    fetch(`/api/comments/${slug}`, {
      method: "PATCH",
      body: JSON.stringify({ id, newScore }),
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
        fetchComments();
      })
      .catch((err) => {
        setComments(prevComments);
      });
  };

  const UpdateCommentHandler = (id, newContent) => {
    const prevComments = [...comments];
    const newComments = comments.map((comment) => {
      return comment._id === id ? { ...comment, content: newContent } : comment;
    });
    setComments(newComments);

    fetch(`/api/comments/id/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ id, newContent }),
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
        // const newComments = comments.filter((comment) => {
        //   return comment._id !== id;
        // });
        // setComments(newComments);
        fetchComments();
      })
      .catch((err) => {
        setComments(prevComments);
      });
  };

  const deleteCommentHandler = (id) => {
    fetch(`/api/comments/id/${id}`, {
      method: "DELETE",
      // body: JSON.stringify({ id, hello: "hi" }),
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
        const newComments = comments.filter((comment) => {
          return comment._id !== id;
        });
        setComments(newComments);
        fetchComments();
      });
  };

  useEffect(() => {
    fetchComments();
  }, [slug]);

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
      {comments && (
        <CommentBox
          slug={post.slug}
          comments={comments}
          upvote={scoreChangeHandler}
          deleteCommentHandler={deleteCommentHandler}
          loading={loading}
          UpdateCommentHandler={UpdateCommentHandler}
        />
      )}

      <CommentForm
        loading={loading}
        slug={post.slug}
        addComment={addCommentHandler}
      />
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
