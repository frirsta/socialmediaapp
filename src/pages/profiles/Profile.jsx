import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserAvatar from "../../components/profile/UserAvatar";
import { db } from "../../firebase/firebase";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import Post from "../../components/post/Post";
import { AuthContext } from "../../context/Context";

const Profile = () => {
  const { user, userData } = useContext(AuthContext);
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  const getUserProfile = async () => {
    const q = query(collection(db, "users"), where("uid", "==", id));
    await onSnapshot(q, (doc) => {
      setProfile(doc.docs[0]?.data());
    });
  };
  const getPosts = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), where("uid", "==", id))
      );
      if (querySnapshot.empty) {
        console.log("No posts found");
        return [];
      }

      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsData);
      return postsData;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  };

  const removeFriend = async (id, name, image) => {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const getDoc = await getDocs(q);
    const userDocumentId = getDoc.docs[0].id;

    await updateDoc(doc(db, "users", userDocumentId), {
      friends: arrayRemove({ id: id, name: name, image: image }),
    });
  };
  const addUser = async () => {
    try {
      const userQuery = query(
        collection(db, "users"),
        where("uid", "==", user?.uid)
      );
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].ref;
        await updateDoc(userData, {
          friends: arrayUnion({
            id: uid,
            image: logo,
            name: name,
          }),
        });
      } else {
        console.error("User document not found.");
      }
    } catch (err) {
      alert(err.message);
      console.error(err.message);
    }
  };
  useEffect(() => {
    getPosts();
    getUserProfile();
  }, [id]);
  console.log(profile);
  console.log(posts);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-100 flex justify-start items-center h-fit">
        <UserAvatar image={profile?.image} />

        <div className="flex md:flex-row-reverse flex-wrap">
          <div className="w-full p-4 text-center">
            <div className="text-left pl-4 pt-3">
              <span className="text-base text-gray-700 mr-2 capitalize">
                {profile?.name}
              </span>
              <span className="text-base font-semibold text-gray-700 mr-2">
                <button className="bg-transparent hover:bg-blue-500 text-gray-700 font-semibold hover:text-white py-2 px-4 border border-gray-600 hover:border-transparent rounded">
                  Edit Profile
                </button>
              </span>
              <span className="text-base font-semibold text-gray-700">
                <button
                  className="p-1 border-transparent text-gray-700 rounded-full hover:text-blue-600 focus:outline-none focus:text-gray-600"
                  aria-label="Notifications"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </button>
              </span>
            </div>
            <div className="text-left pl-4 pt-3">
              <span className="text-base font-semibold text-gray-700 mr-2">
                <b>220</b> posts
              </span>
              <span className="text-base font-semibold text-gray-700 mr-2">
                <b>114</b> followers
              </span>
              <span className="text-base font-semibold text-gray-700">
                <b>{profile?.friends?.length}</b> following
              </span>
            </div>

            <div className="text-left pl-4 pt-3">
              <span className="text-lg font-bold text-gray-700 mr-2 capitalize">
                {profile?.name}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div>
        {posts.length > 0 ? (
          posts?.map((post, index) => (
            <Post
              key={index}
              addUser={addUser}
              removeFriend={removeFriend}
              logo={post?.logo}
              photoURL={post?.photoURL}
              id={post?.documentId}
              uid={post?.uid}
              name={post?.name}
              email={post?.email}
              image={post?.image}
              text={post?.text}
              friendList={post?.friendList}
              user={user}
              timestamp={new Date(post?.timestamp?.toDate())?.toUTCString()}
            />
          ))
        ) : (
          <div>No posts yet</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
