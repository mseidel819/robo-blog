import Link from "next/link";
import Image from "next/image";
import styles from "./post-item.module.css";
import { useState, useEffect } from "react";

const PostItem = ({ post }) => {
  const { title, image, excerpt, date, slug } = post;
  const [formattedDate, setDate] = useState();

  useEffect(() => {
    const formattedDate1 = new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setDate(formattedDate1);
  }, [date]);

  // const formattedDate = new Date(date).toLocaleDateString("en-US", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });

  const imagePath = `/images/posts/${slug}/${image}`;
  const linkPath = `/posts/${slug}`;

  return (
    <li className={styles.post}>
      <Link href={linkPath}>
        <div className={styles.image}>
          <Image
            src={imagePath}
            alt={title}
            //  width={300}
            // height={200}
            fill
          />
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
