import { ObjectId } from "bson";

export type PostData = {
  slug: string;

  [key: string]: any;
};

export type User = {
  username: string;
  email: string;
  id?: string;
};

export type Comment = {
  _id?: ObjectId;
  articleId: string;
  content: string;
  createdAt: Date;
  upvoted: string[];
  downvoted: string[];
  user: User;
  replies?: Comment[];
};
