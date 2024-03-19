import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useContext } from "react";
import UserAvatar from "../profile/UserAvatar";
import PostMenu from "./PostMenu";
import { AuthContext } from "../../context/Context";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import LikeButton from "./postButtons/LikeButton";
import BookmarkButton from "./postButtons/BookmarkButton";
import ShareButton from "./postButtons/ShareButton";

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
  state,
}) => {
  const { user, setUser } = useContext(AuthContext);
  const postDocument = doc(db, "posts", id);
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
              <BookmarkButton id={id} />{" "}
            </div>
          </div>
          <div className="ml-3 flex justify-start items-baseline">
            {/* {state?.likes && <DisplayUserImages users={state.likes} />} */}
            <Typography className="mt-3 ml-1">
              {state?.likes.length > 0 && state?.likes.length}
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
