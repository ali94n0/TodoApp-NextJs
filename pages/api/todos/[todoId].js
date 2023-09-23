import User from "@/models/users";
import ConnectDB from "@/utilities/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await ConnectDB();
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: "Internal error!" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(422)
      .json({ status: "failed", message: "you are not loggin!" });
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) {
    return res
      .status(422)
      .json({ status: "failed", message: "user doen't exist" });
  }

  if (req.method === "PATCH") {
    const { todoId } = req.query;
    const { title, details, todoStatus } = req.body;

    const updatedTodo = await User.updateOne(
      {
        "todos._id": todoId,
      },
      {
        $set: {
          "todos.$.title": title,
          "todos.$.status": todoStatus,
          "todos.$.details": details,
        },
      }
    );
    res.status(201).json({
      status: "success",
      message: "todo updated successfully",
      data: {
        title,
        details,
        status: todoStatus,
      },
    });
  }
}
