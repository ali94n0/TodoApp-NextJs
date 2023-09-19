import User from "@/models/users";
import { hashPassword } from "@/utilities/auth";
import ConnectDB from "@/utilities/connectDB";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  try {
    await ConnectDB();
  } catch (error) {
    return res.status(500).jason({
      status: "failed",
      message: "internal error in connecting to DB",
    });
  }
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).jason({
      status: "failed",
      message: "Invalid Data",
    });
  }

  const existedUser = await User.findOne({ email: email });

  if (existedUser) {
    return res.status(422).json({
      status: "failed",
      message: "User already existed!",
    });
  }

  const hashesdPassword = await hashPassword(password);

  const newUser = await User.create({ email, password: hashesdPassword });

  res.status(201).json({
    status: "success",
    message: "user created successfully",
    body: { email },
  });
}
