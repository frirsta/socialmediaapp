import React, { useEffect, useReducer } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { postActions, Reducer, postState } from "../../context/Reducer";
import Comment from "./Comment";

const Comments = ({ postId, number }) => {
  const [state, dispatch] = useReducer(Reducer, postState);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionsOfComments = collection(
          db,
          `posts/${postId}/comments`
        );
        const q = query(collectionsOfComments, orderBy("timestamp", "desc"));
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_COMMENT,
            comments: doc.docs?.map((item) => item.data()),
          });
        });
      } catch (error) {
        dispatch({ type: HANDLE_ERROR });
        alert(error.message);
        console.error(error);
      }
    };
    return () => getComments();
  }, [ADD_COMMENT, postId, HANDLE_ERROR]);
  return (
    <div>
      {state?.comments?.map(
        (comment, index) =>
          index < number && (
            <Comment
              key={index}
              name={comment?.name}
              comment={comment?.comment}
              image={comment?.image}
              timestamp={new Date(comment?.timestamp?.toDate())?.toUTCString()}
            />
          )
      )}
    </div>
  );
};

export default Comments;
