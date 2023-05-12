import Link from "next/link";
import Image from "next/image";
import styles from "./post-item.module.css";
import { useState, useEffect } from "react";
import { PostData } from "@/types";

type Props = {
  post: PostData;
};

const PostItem = ({ post }: Props) => {
  const { title, image, excerpt, date, slug } = post;
  const [formattedDate, setDate] = useState<string | null>();

  useEffect(() => {
    const formattedDate1 = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(formattedDate1);
  }, [date]);

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={styles.post}>
      <Link href={linkPath}>
        <div className={styles.image}>
          <Image src={imagePath} alt={title} fill />
        </div>
        <div className={styles.content}>
          <h3>{title}</h3>
          <time>{formattedDate}</time>
          <p>{excerpt}</p>
        </div>
      </Link>
    </li>
  );
};

export default PostItem;
