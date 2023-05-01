export const DUMMY_COMMENTS = [
  {
    id: 1,
    articleId: "introductions",
    content:
      "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    createdAt: "2022-01-01",
    score: 12,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "amyrobson",
      userId: "",
    },
    replies: [],
  },
  {
    id: 2,
    articleId: "introductions",
    content: " Testtestetetete",
    createdAt: "2022-05-01",
    score: 2,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "marp",
      userId: "",
    },
    replies: [],
  },
  {
    id: 3,
    articleId: "introductions",
    content: "Another Tesr",
    createdAt: "2022-02-12",
    score: 0,
    user: {
      image: {
        png: "./images/avatars/image-amyrobson.png",
        webp: "./images/avatars/image-amyrobson.webp",
      },
      username: "Burp",
      userId: "",
    },
    replies: [
      {
        id: 4,
        content: "Reply Test",
        createdAt: "2022-02-12",
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "Burp",
          userId: "",
        },
        replies: [],
      },
      {
        id: 5,
        content: "Reply Test",
        createdAt: "2022-02-12",
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "Burp",
          userId: "",
        },
        replies: [],
      },
      {
        id: 6,
        content: "Reply Test",
        createdAt: "2022-02-12",
        score: 0,
        user: {
          image: {
            png: "./images/avatars/image-amyrobson.png",
            webp: "./images/avatars/image-amyrobson.webp",
          },
          username: "Burp",
          userId: "",
        },
        replies: [
          {
            id: 4,
            content: "Reply Test",
            createdAt: "2022-02-12",
            score: 0,
            user: {
              image: {
                png: "./images/avatars/image-amyrobson.png",
                webp: "./images/avatars/image-amyrobson.webp",
              },
              username: "Burp",
              userId: "",
            },
            replies: [],
          },
        ],
      },
    ],
  },
];

export const activeUserBot = {
  username: "userBot",
  email: "userbot@gmail.com",
  image: {
    png: "./images/avatars/image-amyrobson.png",
    webp: "./images/avatars/image-amyrobson.webp",
  },
  userId: "bot1",
};
