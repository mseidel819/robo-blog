import { connectToDb } from "@/lib/db";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  //   console.log(req.query);
  const { id } = req.query;
  const formattedId = new ObjectId(id);

  let client;
  try {
    client = await connectToDb();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    return;
  }

  const db = client.db();
  let result;

  if (req.method === "PATCH") {
    const { newContent } = req.body;
    try {
      result = await db
        .collection("comments")
        .updateOne({ _id: objectId }, { $set: { content: newContent } });
    } catch (err) {
      client.close();
      res.status(500).json({ message: "could not find comments" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Comment deleted",
    });
  }

  if (req.method === "DELETE") {
    try {
      result = await db
        .collection("comments")
        .findOneAndDelete({ _id: formattedId });
    } catch (err) {
      client.close();
      res.status(500).json({ message: "could not find comments" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "Comment deleted",
    });
  }
};

export default handler;
