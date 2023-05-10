import { connectToDb } from "@/lib/db";
import { MongoClient, ObjectId } from "mongodb";

const handler = async (req, res) => {
  const { slug } = req.query;

  if (req.method === "GET") {
    let client;

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

    let client;

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

  if (req.method === "PATCH" && req.body.newScore) {
    const { id, newScore } = req.body;
    let client;

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
      const commentCollection = await db.collection("comments");

      const result = await commentCollection.updateOne(
        { _id: objectId },
        { $set: { score: newScore } }
      );

      if (result.length === 0) {
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
