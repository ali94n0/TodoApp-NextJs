import User from "@/models/users";
import { verifyPassword } from "@/utilities/auth";
import ConnectDB from "@/utilities/connectDB";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    await ConnectDB();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Internal error in connecting to DB",
    });
  }

  const session = await getSession({ req });

  if (!session) {
    return res.status(422).json({
      status: "failed",
      message: "you are not logged in",
    });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(422).json({
      status: "failed",
      message: "user doesn't exist",
    });
  }

  if (req.method === "PATCH") {
    const { name, lastName, email, password } = req.body;
    console.log(req.body);

    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "email or password wrong",
      });
    }

    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.save();

    res.status(201).json({
      status: "success",
      message: "updated user successfully",
      data: { email, name, lastName },
    });
  }
}
