import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    minLength: 3,
  },
  lastName: String,
  createdAt: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  todos: [{ title: String, status: String }],
});

const User = models.User || model("User", userSchema);

export default User;
