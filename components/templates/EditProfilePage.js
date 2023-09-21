import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

function EditProfilePage({ user }) {
  const [updatedData, setUpdatedData] = useState({
    name: user.name || "",
    lastName: user.lastName || "",
    email: user.email,
    password: "",
  });
  const router = useRouter();

  const changeHandler = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };
  const updateHandler = async () => {
    const res = await fetch("/api/profile/edit", {
      method: "PATCH",
      body: JSON.stringify(updatedData),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      const response = await signIn("credentials", {
        email: updatedData.email,
        password: updatedData.password,
        redirect: false,
      });
      router.push("/profile");
      // toast.success("user updated successfully", {
      //   position: "top-right",
      // });
    }
  };
  return (
    <div>
      <h4>
        <CgProfile />
        Edit Profile
      </h4>

      <div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={updatedData.name}
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div>
        <label htmlFor="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={updatedData.lastName}
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={updatedData.email}
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={updatedData.password}
          onChange={(e) => changeHandler(e)}
        />
      </div>
      <button onClick={updateHandler}>update</button>
      {/* <ToastContainer /> */}
    </div>
  );
}

export default EditProfilePage;
