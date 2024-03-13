import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAvatar from "../../components/profile/UserAvatar";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
  
    useEffect(() => {
      const getUserProfile = async () => {
        const q = query(collection(db, "users"), where("uid", "==", id));
        await onSnapshot(q, (doc) => {
          setProfile(doc.docs[0].data());
        });
      };
      getUserProfile();
    }, [id]);
    console.log(profile);

  return (
    <div>
      <h1>Profile</h1>
      <div className="w-3/4 grid grid-cols-5">
        <div className="object-center">
          <UserAvatar image={profile?.image} height="h-32" width="w-32" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
