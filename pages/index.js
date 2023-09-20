import TodosPage from "@/components/templates/TodosPage";
import { getSession } from "next-auth/react";

export default function Home() {
  return <TodosPage />;
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
