import React from "react";

function ProfileForm({
  name,
  lastName,
  password,
  setName,
  setLastName,
  setPassword,
  submitHandler,
}) {
  return (
    <div className="profile-form__input">
      <div>
        <lable htmlFor={"name"}>Name</lable>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <lable htmlFor={"lastName"}>Last Name</lable>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div>
        <lable htmlFor={"password"}>Password</lable>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default ProfileForm;
