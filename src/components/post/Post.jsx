import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useReducer, useState } from "react";
import UserAvatar from "../profile/UserAvatar";
import PostMenu from "./PostMenu";
import { AuthContext } from "../../context/Context";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import LikeButton from "./postButtons/LikeButton";
import BookmarkButton from "./postButtons/BookmarkButton";
import ShareButton from "./postButtons/ShareButton";
import LikedBy from "./LikedBy";
import { Reducer, postActions, postState } from "../../context/Reducer";

const Post = ({
  id,
  image,
  photoURL,
  logo,
  name,
  text,
  timestamp,
  uid,
  email,
  friendList,
  addUser,
  removeFriend,
}) => {
  const { user } = useContext(AuthContext);
  const postDocument = doc(db, "posts", id);
  const [state, dispatch] = useReducer(Reducer, postState);
  const { ADD_LIKE, HANDLE_ERROR, ADD_BOOKMARK } = postActions;

  const deletePost = async (e) => {
    e.preventDefault();
    try {
      if (user?.uid === uid) {
        await deleteDoc(postDocument);
      } else {
        alert("You can only delete your own posts");
      }
    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  };
  const getBookmarks = async () => {
    try {
      const bookmarksQuery = collection(db, "posts", id, "bookmarks");
      await onSnapshot(bookmarksQuery, (doc) => {
        dispatch({
          type: ADD_BOOKMARK,
          bookmarks: doc.docs.map((item) => item.data()),
        });
      });
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
    }
  };

  const getLikes = async () => {
    try {
      const likesQuery = collection(db, "posts", id, "likes");
      await onSnapshot(likesQuery, (doc) => {
        dispatch({
          type: ADD_LIKE,
          likes: doc.docs.map((item) => item.data()),
        });
      });
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
    }
  };

  useEffect(() => {
    getBookmarks();
    getLikes();
  }, [id, ADD_LIKE, HANDLE_ERROR, user?.uid, ADD_BOOKMARK]);
  return (
    <div className="bg-gray-100 p-4">
      <Card className="bg-white border rounded-sm max-w-md">
        <CardHeader
          className="flex items-center justify-between"
          shadow={false}
          floated={false}
        >
          <div className="flex items-center mb-3">
            <UserAvatar width={"30px"} image={logo} name={name} />
            <Typography className="ml-3 capitalize">{name}</Typography>
            <Typography className="ml-3 capitalize">{text}</Typography>
          </div>
          <div className="flex items-center mb-3 mr-2">
            {user?.email === email ? (
              <PostMenu handledelete={deletePost} />
            ) : friendList?.length > 0 ? (
              friendList?.map(
                (friend) =>
                  friend.id === uid && (
                    <Button
                      size="sm"
                      onClick={() =>
                        removeFriend(friend.id, friend.name, friend.image)
                      }
                    >
                      Unfollow
                    </Button>
                  )
              )
            ) : (
              <Button color="blue" size="sm" onClick={addUser}>
                Follow
              </Button>
            )}
          </div>
        </CardHeader>
        <img src={image} alt={text} className="h-full w-full object-cover" />
        <CardBody className="w-100 p-3 pb-0">
          <div className="flex justify-between">
            <div className="flex flex-row justify-start">
              <LikeButton id={id} />
              {/* <CommentButton openModal={openModal} /> */}
              <ShareButton />
            </div>
            <div>
              {" "}
              <BookmarkButton id={id} />
            </div>
          </div>
          <div className="ml-3 flex justify-start items-baseline">
            {state?.likes && <LikedBy users={state?.likes} />}
            <Typography className="mt-3 ml-1">
              {state?.likes?.length > 0 && state?.likes.length}
            </Typography>
          </div>
          <hr className="my-3 border-blue-gray-50 w-100" />
        </CardBody>

        <CardFooter className="flex flex-col justify-between pt-0">
          <div>Footer</div> {/* <CommentSection postId={id} number={2} />  */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
