import Link from "next/link";
import React from "react";

function ProfileData({ profile }) {
  return (
    <div className="profile-data">
      <div>
        <span>Name:</span>
        <p>{profile.name}</p>
      </div>
      <div>
        <span>Last Name:</span>
        <p>{profile.lastName}</p>
      </div>
      <div>
        <span>Email:</span>
        <p>{profile.email}</p>
      </div>
      <button>
        <Link href={`/edit/${profile.id}`}>Edit</Link>
      </button>
    </div>
  );
}

export default ProfileData;
