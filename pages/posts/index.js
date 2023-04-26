import AllPosts from "@/components/posts/all-posts";

const DUMMY_POSTS = [
  {
    title: "title for1",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Hello Excerpts bla bla bla blab blslblflvf fvlegdv efvd ergef",
    date: "2022-02-02",
  },
  {
    title: "title for2",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Hello Excerpts bla bla bla blab blslblflvf fvlegdv efvd ergef",
    date: "2022-02-02",
  },
  {
    title: "title for3",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Hello Excerpts bla bla bla blab blslblflvf fvlegdv efvd ergef",
    date: "2022-02-02",
  },
  {
    title: "title for4",
    slug: "getting-started-with-nextjs",
    image: "getting-started-nextjs.png",
    excerpt: "Hello Excerpts bla bla bla blab blslblflvf fvlegdv efvd ergef",
    date: "2022-02-02",
  },
];

const AllPostsPage = () => {
  return <AllPosts posts={DUMMY_POSTS} />;
};
export default AllPostsPage;
