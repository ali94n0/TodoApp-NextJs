import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function SignUpPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { status } = useSession();

  const signUpHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data.status === "success") {
      setEmail("");
      setPassword("");
      router.push("/signin");
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);
  return (
    <div className="signin-form">
      <h3>Registration Form</h3>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signUpHandler}>SignUp</button>
      <div>
        <p>Have an Account?</p>
        <Link href={"/signin"}>SignIn</Link>
      </div>
    </div>
  );
}

export default SignUpPage;
