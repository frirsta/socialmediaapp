import React, { useContext, useReducer } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import UserAvatar from "../profile/UserAvatar";
import { AuthContext } from "../../context/Context";
import CommentField from "../Comments/CommentField.jsx";
import LikeButton from "./postButtons/LikeButton";
import CommentButton from "../Comments/CommentButton";
import ShareButton from "./postButtons/ShareButton";
import BookmarkButton from "./postButtons/BookmarkButton";
import { Reducer, postActions, postState } from "../../context/Reducer";
import LikedBy from "./LikedBy";
import Comments from "../Comments/Comments";
const PostDetailsModal = ({
  handler,
  addUser,
  isOpen,
  id,
  image,
  logo,
  photoURL,
  name,
  text,
  timestamp,
  uid,
  likes,
}) => {
  const { userData } = useContext(AuthContext);
  const friendList = userData?.friends;
  return (
    <Dialog
      className="md:max-h-[756px] md:max-w-[604px] md:h-fit md:w-fit flex flex-col justify-start items-center bg-white max-h-[90%] w-64 max-w-72 min-w-[60vw] rounded-lg shadow-lg overflow-hidden"
      open={isOpen}
      handler={handler}
    >
      <div className="flex flex-row justify-between items-center w-full pt-2 px-3 md:hidden">
        <div className="flex items-center">
          <UserAvatar image={logo || photoURL} width={"32px"} height={"32px"} />
          <Typography className="text-md font-bold mb-0 ml-3">
            {name}
          </Typography>
        </div>

        <div className="flex items-center mr-2">
          {friendList?.length > 0 ? (
            friendList?.map(
              (friend) =>
                friend?.id === uid && (
                  <Button
                    key={friend?.id}
                    size="sm"
                    onClick={() =>
                      removeFriend(friend?.id, friend?.name, friend?.image)
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
      </div>
      <div className="md:flex md:w-full">
        <DialogHeader className="m-0 shrink-0 rounded-r-none md:w-[50%] md:h-96 h-3/6 px-0 pt-2 md:pt-0 pb-0">
          <img src={image} alt={text} className="h-full w-full object-cover" />
        </DialogHeader>
        <DialogBody className="flex md:h-96 md:w-[50%] flex-col justify-start bg-white w-full h-1/6 p-[5px]">
          <div className="flex flex-col items-start justify-between md:h-full">
            <div className="md:mt-1 md:flex flex-row justify-between items-baseline w-full hidden">
              <div className="flex flex-col items-baseline">
                <div className="flex items-center">
                  <UserAvatar
                    image={logo || photoURL}
                    width={"32px"}
                    height={"32px"}
                  />
                  <Typography className="text-md font-bold mb-0 ml-3">
                    {name}
                  </Typography>
                </div>
              </div>

              <div className="flex items-center mr-2">
                {friendList?.length > 0 ? (
                  friendList?.map(
                    (friend) =>
                      friend?.id === uid && (
                        <Button
                          key={friend?.id}
                          size="sm"
                          onClick={() =>
                            removeFriend(
                              friend?.id,
                              friend?.name,
                              friend?.image
                            )
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
            </div>
            <hr className="w-full mt-3 md:mt-2 hidden md:block" />
            <div className="md:flex flex-col items-baseline md:mt-1 hidden"></div>
            <div className="w-[100%] flex flex-col justify-between h-[87%]">
              <div className="overflow-scroll hidden md:block">
                <Comments postId={id} number={100} />
              </div>

              <div className="w-100 ">
                <hr className="border-blue-gray-50 w-100 hidden md:block" />
                <div className="flex justify-between">
                  <div className="flex flex-row justify-start">
                    <LikeButton size={"lg"} id={id} />
                    <CommentButton size={"lg"} handleOpenModal={handler} />
                    <ShareButton size={"lg"} />
                  </div>
                  <div>
                    <BookmarkButton size={"lg"} id={id} />
                  </div>
                </div>

                <div className="ml-3 flex justify-start items-baseline">
                  {likes && <LikedBy users={likes} />}
                  <Typography className="md:mt-1 ml-1 text-xs">
                    {likes?.length > 0 && likes.length}
                  </Typography>
                </div>

                <div>
                  <hr className="border-blue-gray-50 w-100 md:mt-1 mt-3 " />
                  <CommentField postId={id} />
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
      </div>
    </Dialog>
  );
};

export default PostDetailsModal;
