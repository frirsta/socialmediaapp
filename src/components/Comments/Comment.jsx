import { Typography } from "@material-tailwind/react";
import React from "react";
import UserAvatar from "../profile/UserAvatar";
import moment from "moment";
const Comment = ({ name, comment, image, timestamp }) => {
  const timeAgo = moment(timestamp).fromNow();
  return (
    <div className="flex flex-col justify-start items-start">
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-3 my-2">
          <UserAvatar width={"32px"} height={"32px"} image={image} />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-start">
            {name && (
              <Typography className="text-[0.875rem] font-extrabold">
                {name}
              </Typography>
            )}
            <Typography className="text-[14px] ml-1">{comment}</Typography>
          </div>

          <Typography className="text-[12px] text-gray-400 font-bold">
            {timeAgo}{" "}
          </Typography>
        </div>
      </div>
      <hr className="w-full" />
    </div>
  );
};

export default Comment;
