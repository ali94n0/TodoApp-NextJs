import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

function SignInPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { status } = useSession();

  const signInHandler = async () => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!res.error) {
      setEmail("");
      setPassword("");
      router.replace("/");
    }
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status]);
  return (
    <div className="signin-form">
      <h3>LogIn Form</h3>
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
      <button onClick={signInHandler}>LogIn</button>
      <div>
        <p>Create an account?</p>
        <Link href={"/signup"}>Sign Up</Link>
      </div>
    </div>
  );
}

export default SignInPage;
