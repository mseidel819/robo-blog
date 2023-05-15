import { connectToDb } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { ContactRequestBody } from "./types";
import { MongoClient, ObjectId } from "mongodb";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method === "POST") {
    const { email, name, message }: ContactRequestBody = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({
        message: "invalid input",
      });
      return;
    }

    const newMessage: {
      email: string;
      name: string;
      message: string;
      id?: ObjectId;
    } = { email, name, message };

    let client: MongoClient;

    try {
      client = await connectToDb();
    } catch (err) {
      res.status(500).json({ message: "something went wrong" });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (err) {
      client.close();
      res.status(500).json({ message: "storing message failed" });
      return;
    }

    client.close();

    res.status(201).json({
      message: "success. stored message",
      data: newMessage,
    });
  }
};

export default handler;
