import React from "react";
import avatar from "../../assets/avatar/avatar.png";
import UserAvatar from "../profile/UserAvatar";

const LikedBy = ({ users }) => {
  return (
    <div className="flex items-center -space-x-1">
      {users.map(
        (user, index) =>
          index < 3 && (
            <UserAvatar
              height={"20px"}
              width={"20px"}
              key={user?.id}
              className="inline-block rounded-full ring-2 ring-white"
              image={user?.image || user?.photoURL || user?.logo || avatar}
              name={user?.name || "User"}
            />
          )
      )}
    </div>
  );
};

export default LikedBy;
