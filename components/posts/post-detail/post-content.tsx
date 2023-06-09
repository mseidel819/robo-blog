import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";
import js from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import arduino from "react-syntax-highlighter/dist/cjs/languages/prism/arduino";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import PostHeader from "./post-header";
import styles from "./post-content.module.css";
import Image from "next/image";
import { PostData } from "@/types";
import React from "react";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("arduino", arduino);
SyntaxHighlighter.registerLanguage("css", css);

type Props = {
  post: PostData;
};

const PostContent = ({ post }: Props) => {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    p(paragraph) {
      const { node } = paragraph;

      if (node.children[0].tagName === "img") {
        const image = node.children[0];
        return (
          <div className={styles.image}>
            <Image
              src={image.properties.src}
              height={300}
              width={600}
              alt={image.properties.alt}
            />
          </div>
        );
      }
      return <p>{paragraph.children}</p>;
    },
    code(code) {
      const { className, children } = code;
      const language = className.split("-")[1];

      return (
        <SyntaxHighlighter
          language={language}
          // eslint-disable-next-line react/no-children-prop
          children={children}
          style={atomDark}
        />
      );
    },
  };

  return (
    <article className={styles.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
};

export default PostContent;
