import { connectToDb } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }
  const { newUsername } = req.body;
  console.log(req.body);

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({
      message: "not authenticated",
    });
  }
  const userEmail = session.user.email;

  const client = await connectToDb();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    client.close();
    return;
  }

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { username: newUsername } }
  );
  client.close();

  res.status(200).json({ message: "Username updated" });
};

export default handler;
