import { hashPassword, verifyPassword } from "@/lib/auth";
import { connectToDb } from "@/lib/db";
// import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const handler = async (req, res) => {
  if (req.method !== "PATCH") {
    return;
  }

  // const session = await getSession({ req });
  const session = await getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    res.status(401).json({
      message: "not authenticated",
    });
  }
  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPasword = req.body.newPassword;

  const client = await connectToDb();
  const usersCollection = await client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEqual = await verifyPassword(oldPassword, currentPassword);

  if (!passwordsAreEqual) {
    res.status(422).json({ message: "passwords don't match" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPasword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hashedPassword } }
  );
  client.close();

  res.status(200).json({ message: "password updated" });
};

export default handler;
