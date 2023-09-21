import TodoDetailsPage from "@/components/templates/TodoDetailsPage";
import User from "@/models/users";
import { getSession } from "next-auth/react";
import React from "react";

function TodoDetails({ todo }) {
  return <TodoDetailsPage todo={todo} />;
}

export default TodoDetails;

export async function getServerSideProps({ params, req }) {
  const { todoId } = params;

  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  const user = await User.findOne({ email: session.user.email });

  const todo = user.todos.find((item) => item._id == todoId);

  return {
    props: { todo: JSON.parse(JSON.stringify(todo)) },
  };
}
