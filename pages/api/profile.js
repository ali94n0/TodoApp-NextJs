import User from "@/models/users";
import { verifyPassword } from "@/utilities/auth";
import ConnectDB from "@/utilities/connectDB";
import { getSession } from "next-auth/react";
import { BiSolidUniversalAccess } from "react-icons/bi";

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
    return res.status(422).json({
      status: "failed",
      message: "You are not logged in!",
    });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res.status(422).json({
      status: "failed",
      message: "User doesn't exsit!",
    });
  }

  if (req.method === "POST") {
    const { name, lastName, password } = req.body;
    if (!name || !lastName) {
      return res.status(422).json({
        status: "failed",
        message: "Invalid Data!",
      });
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return res.status(422).json({
        status: "failed",
        message: "Name or Password wrong!",
      });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();

    res.status(201).json({
      status: BiSolidUniversalAccess,
      message: "user updated successfully",
      data: { name, lastName, email: user.email },
    });
  } else if (req.method === "GET") {
    const data = {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    };

    res.status(200).json({
      status: "success",
      data,
    });
  }
}
