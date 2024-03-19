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
import bookmark from "../../../assets/icons/bookmark.png";
import bookmark_outline from "../../../assets/icons/bookmark_outline.png";
const BookmarkButton = ({ id }) => {
  const [saved, setSaved] = useState(false);
  const [hover, setHover] = useState(false);
  const [state, dispatch] = useReducer(Reducer, postState);
  const { user } = useContext(AuthContext);
  const bookmarkCollection = collection(db, "posts", id, "bookmarks");
  const { ADD_BOOKMARK, HANDLE_ERROR } = postActions;
  const handleHover = () => {
    setHover(!hover);
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    const bookmarkQuery = query(
      bookmarkCollection,
      where("id", "==", user?.uid)
    );
    const bookmarkQuerySnapshot = await getDocs(bookmarkQuery);
    const bookmarkDocId = await bookmarkQuerySnapshot.docs[0]?.id;
    try {
      if (bookmarkDocId !== undefined) {
        const deleteBookmarkId = doc(
          db,
          "posts",
          id,
          "bookmarks",
          bookmarkDocId
        );
        await deleteDoc(deleteBookmarkId);
        setSaved(false);
      } else {
        await setDoc(doc(bookmarkCollection, user?.uid), {
          id: user?.uid,
          name: user?.displayName,
          photoURL: user?.image || user?.photoURL,
        });
        console.log("Post saved");
        setSaved(true);
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    const getBookmark = async () => {
      try {
        const bookmarkQuery = collection(db, "posts", id, "bookmarks");
        await onSnapshot(bookmarkQuery, (doc) => {
          dispatch({
            type: ADD_BOOKMARK,
            bookmark: doc.docs.map((item) => item.data()),
          });
          const userBookmark = doc.docs.some((item) => item.id === user?.uid);
          setSaved(userBookmark);
          console.log(userBookmark);
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
      }
    };

    return () => getBookmark();
  }, [id, ADD_BOOKMARK, HANDLE_ERROR, user?.uid]);

  return (
    <div>
      <Tooltip content={saved ? "Remove saved post" : "Save"}>
        <IconButton
          size="lg"
          variant="text"
          className="rounded-full"
          onClick={handleBookmark}
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          {saved || hover ? (
            <>
              <img src={bookmark} alt="bookmark" />
            </>
          ) : (
            <>
              <img src={bookmark_outline} alt="bookmark outlined" />
            </>
          )}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default BookmarkButton;
