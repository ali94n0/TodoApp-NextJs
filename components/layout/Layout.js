import Link from "next/link";
import { VscListSelection } from "react-icons/vsc";
import { BiMessageSquareAdd } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import { FiLogOut } from "react-icons/fi";
import { signOut, useSession } from "next-auth/react";

function Layout({ children }) {
  const { status } = useSession();
  const signOutHandler = async () => {
    signOut();
  };

  return (
    <div className="container">
      <header>
        <p>Next Todo App</p>
        {status === "authenticated" ? (
          <button onClick={signOutHandler}>
            Log Out
            <FiLogOut />
          </button>
        ) : null}
      </header>
      <div className="container--main">
        <aside>
          <p>Welcome 👋</p>
          <ul>
            <li>
              <VscListSelection />
              <Link href={"/"}>Todos</Link>
            </li>
            <li>
              <BiMessageSquareAdd />
              <Link href={"/new-todo"}>New Todo</Link>
            </li>
            <li>
              <RxDashboard />
              <Link href={"/profile"}>Profile</Link>
            </li>
          </ul>
        </aside>
        <section>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
