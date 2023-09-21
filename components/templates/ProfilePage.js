import { CgProfile } from "react-icons/cg";
import ProfileForm from "../modules/ProfileForm";
import { useEffect, useState } from "react";
import ProfileData from "../modules/ProfileData";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

function ProfilePage(props) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profile, setProfile] = useState(null);
  const router = useRouter();

  const { status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.replace("/signin");
    }
    fetchProfile();
  }, [status]);

  const fetchProfile = async () => {
    const res = await fetch("/api/profile");
    const data = await res.json();
    if (data.status === "success" && data.data.name && data.data.lastName) {
      setProfile(data.data);
    }
  };

  const submitHandler = async () => {
    const res = await fetch("/api/profile", {
      method: "POST",
      body: JSON.stringify({ name, lastName, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data);
    if (data.status === "success") {
      setName("");
      setLastName("");
      setPassword("");
      fetchProfile();
    }
  };

  return (
    <div className="profile-form">
      <h2>
        <CgProfile />
        Profile
      </h2>
      {profile ? (
        <ProfileData profile={profile} />
      ) : (
        <ProfileForm
          name={name}
          lastName={lastName}
          password={password}
          setName={setName}
          setLastName={setLastName}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}

export default ProfilePage;
