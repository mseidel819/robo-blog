import { connectToDb } from "@/lib/db";
import { Document, MongoClient, ObjectId, UpdateResult } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug } = req.query;

  if (req.method === "GET") {
    let client: MongoClient;

    try {
      client = await connectToDb();
    } catch (err) {
      res.status(500).json({ message: "something went wrong" });
      return;
    }

    const db = client.db();
    let result;
    try {
      result = await db.collection("comments").find().toArray();
      result.filter((comment) => comment.articleId === slug);
      // newComment.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "could not find comments" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "success.",
      data: result,
    });
  }

  if (req.method === "POST") {
    const newComment = req.body;

    let client: MongoClient;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.frabwah.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (err) {
      res.status(500).json({ message: "something went wrong" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("comments").insertOne(newComment);
      // newComment.id = result.insertedId;
      // console.log(newComment);
    } catch (err) {
      client.close();
      res.status(500).json({ message: "storing message failed" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "success. stored message",
      data: newComment,
    });
  }

  if (req.method === "PATCH" && req.body.voteDirection) {
    const { id, userEmail, voteDirection } = req.body;
    let client: MongoClient;

    const objectId = new ObjectId(id);

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.frabwah.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (err) {
      res.status(500).json({ message: "something went wrong" });
      return;
    }

    const db = client.db();

    try {
      const commentCollection = db.collection("comments");

      // const result = await commentCollection.updateOne(
      //   { _id: objectId },
      //   { $set: { score: newScore } }
      // );

      const findUser = await commentCollection.findOne({ _id: objectId });

      let result: UpdateResult<Document>;

      if (!userEmail) throw new Error("no user found");

      if (
        voteDirection === "upvoted" &&
        (findUser.upvoted === undefined ||
          (findUser.upvoted && !findUser.upvoted.includes(userEmail)))
      ) {
        if (findUser.downvoted && findUser.downvoted.includes(userEmail)) {
          result = await commentCollection.updateOne(
            { _id: objectId },
            {
              $pull: { downvoted: userEmail },
              $push: { upvoted: userEmail },
            }
          );
        } else {
          result = await commentCollection.updateOne(
            { _id: objectId },
            { $push: { upvoted: userEmail } }
          );
        }
      } else if (
        voteDirection === "upvoted" &&
        findUser.upvoted &&
        findUser.upvoted.includes(userEmail)
      ) {
        result = await commentCollection.updateOne(
          { _id: objectId },
          { $pull: { upvoted: userEmail } }
        );
      }

      if (
        voteDirection === "downvoted" &&
        (findUser.downvoted === undefined ||
          (findUser.downvoted && !findUser.downvoted.includes(userEmail)))
      ) {
        if (findUser.upvoted && findUser.upvoted.includes(userEmail)) {
          result = await commentCollection.updateOne(
            { _id: objectId },
            {
              $pull: { upvoted: userEmail },
              $push: { downvoted: userEmail },
            }
          );
        } else {
          result = await commentCollection.updateOne(
            { _id: objectId },
            { $push: { downvoted: userEmail } }
          );
        }
      } else if (
        voteDirection === "downvoted" &&
        (findUser.downvoted === undefined ||
          (findUser.downvoted && findUser.downvoted.includes(userEmail)))
      ) {
        result = await commentCollection.updateOne(
          { _id: objectId },
          { $pull: { downvoted: userEmail } }
        );
      }

      if (!result) {
        res.status(404).json({ message: "comment not found" });
        return;
      }
    } catch (err) {
      client.close();
      res.status(500).json({ message: "storing message failed" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "success. vote stored",
    });
  }
};

export default handler;
