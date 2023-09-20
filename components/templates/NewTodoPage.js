import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { useEffect, useState } from "react";
import RadioButton from "../elements/RadioButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

function NewTodoPage(props) {
  const [title, setTitle] = useState("");
  const [todoStatus, setTodoStatus] = useState("todo");
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/signin");
    }
  }, [status]);

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, todoStatus }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setTitle("");
      setTodoStatus("todo");
      toast.success("task added successfully", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          <RadioButton
            value={"todo"}
            title={"Todo"}
            status={todoStatus}
            setStatus={setTodoStatus}
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            value={"inProgress"}
            title={"In Progress"}
            status={todoStatus}
            setStatus={setTodoStatus}
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            value={"review"}
            title={"Review"}
            status={todoStatus}
            setStatus={setTodoStatus}
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            value={"done"}
            title={"Done"}
            status={todoStatus}
            setStatus={setTodoStatus}
          >
            <MdDoneAll />
          </RadioButton>
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default NewTodoPage;
