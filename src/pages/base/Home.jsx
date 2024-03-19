import React, {
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { AuthContext } from "../../context/Context";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Reducer, postActions, postState } from "../../context/Reducer";
import { Alert, Button } from "@material-tailwind/react";
import Post from "../../components/post/Post";

const Home = () => {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const postsCollection = collection(db, "posts");
  const document = postRef.id;
  const [state, dispatch] = useReducer(Reducer, postState);
  const { SUBMIT_POST, HANDLE_ERROR, ADD_LIKE } = postActions;
  const [progressBar, setProgressBar] = useState(0);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const friendList = userData?.friends;

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
  const getPosts = async () => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("timestamp", "desc"))
      );
      if (querySnapshot.empty) {
        // console.log("No posts found");
        return [];
      }

      const postsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return postsData;
    } catch (error) {
      console.error("Error fetching posts:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
      }
    };
    fetchPosts();
  }, [SUBMIT_POST, collectionRef, postsCollection]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col py-4 w-full">
        {state?.error ? (
          <div className="flex justify-center items-center">
            <Alert color="red">
              Something went wrong refresh and try again...
            </Alert>
          </div>
        ) : (
          <div>
            {posts?.map((post, index) => {
              return (
                <Post
                  addUser={addUser}
                  removeFriend={removeFriend}
                  key={index}
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
              );
            })}
          </div>
        )}
      </div>
      <div ref={scrollRef}>{/* refference for later */}</div>
    </div>
  );
};

export default Home;
