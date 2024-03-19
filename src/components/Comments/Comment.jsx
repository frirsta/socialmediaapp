import { Typography } from "@material-tailwind/react";
import React from "react";
import UserAvatar from "../ProfileCard/UserAvatar";

const Comment = ({ name, comment, image }) => {
  return (
    <div className="flex mt-3 items-center">
      <div className="flex-shrink-0 mr-3">
        <UserAvatar width={35} image={image} />
      </div>
      <div className="flex flex-col justify-start items-baseline">
        <Typography className="font-bold">{name}</Typography>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default Comment;
