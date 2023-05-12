import fs from "fs";
import path from "path";
import matter from "gray-matter";

type PostData = {
  slug: string;

  [key: string]: any;
};

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostFiles = (): string[] => fs.readdirSync(postsDirectory);

export const getPostData = (postIdentifier: string): PostData => {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  const postData: PostData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
};

export const getAllPosts = (): PostData[] => {
  const postFiles = getPostFiles();

  const allPosts = postFiles.map((postFile) => getPostData(postFile));

  const sortedPosts = allPosts.sort((a, b) => (a.date > b.date ? -1 : 1));

  return sortedPosts;
};

export const getFeaturedPosts = (): PostData[] => {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
};
