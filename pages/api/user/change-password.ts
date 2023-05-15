import { hashPassword, verifyPassword } from "../../../lib/auth";
import { connectToDb } from "../../../lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { ChangePasswordRequestBody } from "../types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PATCH") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({
      message: "not authenticated",
    });
  }
  const userEmail = session?.user?.email;
  const { oldPassword, newPassword }: ChangePasswordRequestBody = req.body;

  const client = await connectToDb();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    client.close();
    return;
  }

  const currentPassword: string = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEqual) {
    res.status(422).json({ status: "error", message: "passwords don't match" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();

  res.status(200).json({ message: "password updated" });
};

export default handler;
