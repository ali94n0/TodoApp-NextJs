import React, { useState } from "react";
import { PiNotepad } from "react-icons/pi";
import RadioButton from "../elements/RadioButton";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";

function TodoDetailsPage({ todo }) {
  const [title, setTitle] = useState(todo.title);
  const [details, setDetails] = useState(todo.details);
  const [todoStatus, setTodoStatus] = useState(todo.status);

  const editHandler = async () => {
    console.log({ title, details, todoStatus });
  };

  return (
    <div className="add-form">
      <h2>
        <PiNotepad />
        Todo Details
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
        <div className="add-form__input--first">
          <label htmlFor="details">Details</label>
          <textarea
            type="text"
            rows={4}
            id="details"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
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
      <button onClick={editHandler}>Add</button>
    </div>
  );
}

export default TodoDetailsPage;
