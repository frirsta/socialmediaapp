import React, { useContext } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import UserAvatar from "../profile/UserAvatar";
import PostMenu from "./PostMenu";
import { AuthContext } from "../../context/Context";

const PostDetailsModal = ({
  handler,
  isOpen,
  id,
  image,
  logo,
  photoURL,
  name,
  text,
  timestamp,
  uid,
}) => {
  const { user, userData } = useContext(AuthContext);
  const friendList = userData?.friends;
  return (
    <Dialog
      size="lg"
      className="w-full flex flex-row"
      open={isOpen}
      handler={handler}
    >
      <DialogHeader className="m-0 w-3/6 h-96 shrink-0 rounded-r-none">
        <img src={image} alt={text} className="h-full w-full object-cover" />
      </DialogHeader>
      <DialogBody className="flex w-3/6 flex-col justify-start">
        <div className="flex justify-between items-center">
          <div className="flex flex-row justify-between items-center">
            <UserAvatar image={logo} width={30} height={30} />
            <Typography className="text-md font-bold mb-0 ml-3">
              {name}
            </Typography>
          </div>
          <div className="flex items-center mb-3 mr-2">
            {friendList?.length > 0 ? (
              friendList?.map(
                (friend) =>
                  friend.id === uid && (
                    <Button
                      key={friend.id}
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
              <Button key={friend.id} color="blue" size="sm" onClick={addUser}>
                Follow
              </Button>
            )}
          </div>
        </div>
        <hr className="m-1 border-blue-gray-50 w-100" />
        <div className="flex flex-row w-96">
          <Typography className="text-gray-700">{text}</Typography>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default PostDetailsModal;
