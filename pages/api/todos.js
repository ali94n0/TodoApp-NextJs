import User from "@/models/users";
import ConnectDB from "@/utilities/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await ConnectDB();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "internal error in connecting to DB",
    });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(500).json({
      status: "failed",
      message: "You are not logged in!",
    });
  }
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exsit!" });
  }

  const { title, status } = req.body;

  if (!title || !status) {
    return res.status(422).json({
      status: "failed",
      message: "Invalid Data!",
    });
  }

  user.todos.push({ title, status });
  user.save();

  res.status(201).json({
    status: "success",
    message: "todo added successfully",
    data: { todo: { title, status } },
  });
}
