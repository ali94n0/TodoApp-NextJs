import { RiMastodonLine } from "react-icons/ri";
import { BiRightArrow, BiLeftArrow } from "react-icons/bi";
import Link from "next/link";

function Task({ data, back, next, fetchTodos }) {
  const updateHandler = async (id, status) => {
    const res = await fetch("/api/todos", {
      method: "PATCH",
      body: JSON.stringify({ id, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      fetchTodos();
    }
  };
  return (
    <div className="tasks">
      {data?.map((item) => (
        <Link href={`/todos/${item._id}`} key={item._id}>
          <div className="tasks__card">
            <span className={item.status}></span>
            <RiMastodonLine />
            <h4>{item.title}</h4>
            <div>
              {back ? (
                <button
                  className="button-back"
                  onClick={() => updateHandler(item._id, back)}
                >
                  <BiLeftArrow />
                  Back
                </button>
              ) : null}
              {next ? (
                <button
                  className="button-next"
                  onClick={() => updateHandler(item._id, next)}
                >
                  Next
                  <BiRightArrow />
                </button>
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Task;
