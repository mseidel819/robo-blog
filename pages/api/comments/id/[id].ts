import { connectToDb } from "@/lib/db";
import {
  DeleteResult,
  Document,
  ModifyResult,
  MongoClient,
  ObjectId,
  UpdateResult,
} from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

type routerQuery = {
  id?: number;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query as routerQuery;
  const formattedId = new ObjectId(id);

  let client: MongoClient;
  try {
    client = await connectToDb();
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
    return;
  }

  const db = client.db();
  let result: UpdateResult<Document> | ModifyResult<Document>;

  if (req.method === "PATCH") {
    const { newContent } = req.body;
    try {
      result = await db.collection("comments").updateOne(
        { _id: formattedId },
        {
          $set: {
            content: newContent,
          },
        }
      );
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
