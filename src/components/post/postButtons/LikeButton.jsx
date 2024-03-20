import React, { useContext, useEffect, useReducer, useState } from "react";
import { Reducer, postActions, postState } from "../../../context/Reducer";
import { AuthContext } from "../../../context/Context";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { IconButton, Tooltip } from "@material-tailwind/react";
import heart from "../../../assets/icons/heart.png";
import heart_outline from "../../../assets/icons/heart_outline.png";
const LikeButton = ({ id, size }) => {
  const [liked, setLiked] = useState(false);
  const [hover, setHover] = useState(false);
  const [state, dispatch] = useReducer(Reducer, postState);
  const { user } = useContext(AuthContext);
  const likesCollection = collection(db, "posts", id, "likes");
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const handleHover = () => {
    setHover(!hover);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const likesQuery = query(likesCollection, where("id", "==", user?.uid));
    const likesQuerySnapshot = await getDocs(likesQuery);
    const likesDocId = await likesQuerySnapshot.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteLikeId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteLikeId);
        setLiked(false);
      } else {
        await setDoc(doc(likesCollection, user?.uid), {
          id: user?.uid,
          name: user?.displayName,
          photoURL: user?.image || user?.photoURL,
        });
        setLiked(true);
      }
    } catch (err) {
      alert(err.message);
    }
  };
  useEffect(() => {
    const getLikes = async () => {
      try {
        const likesQuery = collection(db, "posts", id, "likes");
        await onSnapshot(likesQuery, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
          const userLiked = doc.docs.some((item) => item.id === user?.uid);
          setLiked(userLiked);
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
      }
    };

    return () => getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR, user?.uid]);

  return (
    <div>
      <Tooltip content={liked ? "Unlike" : "Like"}>
        <IconButton
          size={size}
          variant="text"
          className="rounded-full w-[35px] h-[35px]"
          onClick={handleLike}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          {liked || hover ? (
            <>
              <img className="w-[20px] max-w-[unset]" src={heart} alt="heart" />
            </>
          ) : (
            <>
              <img
                className="w-[20px] max-w-[unset]"
                src={heart_outline}
                alt="heart outlined"
              />
            </>
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default LikeButton;
