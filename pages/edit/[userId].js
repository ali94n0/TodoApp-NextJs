import EditProfilePage from "@/components/templates/EditProfilePage";
import User from "@/models/users";
import { getSession } from "next-auth/react";
import React from "react";

function EditUser({ user }) {
  return <EditProfilePage user={user} />;
}

export default EditUser;

export async function getServerSideProps({ params, req }) {
  const id = params.userId;
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/profile",
        permanent: false,
      },
    };
  }

  const user = await User.findOne({ _id: id });

  return {
    props: {
      user: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
    },
  };
}
