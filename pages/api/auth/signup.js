import { hashPassword } from "@/lib/auth";
import { connectToDb } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    const { email, password, username } = data;
    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Please enter a valid Email" });

      return;
    }

    const client = await connectToDb();

    const db = client.db();

    const existingUser = await db.collection("users").findOne({ email: email });
    if (existingUser) {
      res.status(422).json({ message: "This email already exists." });
      client.close();
      return;
    }

    if (!password || password.trim().length < 7) {
      res
        .status(422)
        .json({ message: "Password must be at least 7 characters." });

      return;
    }

    const hashedPassword = await hashPassword(password);

    const result = await db.collection("users").insertOne({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User created!" });
    client.close();
  }
};
export default handler;
