import React from "react";
import avatar from "../../assets/avatar/avatar.png";

const LikedBy = ({ users }) => {
  return (
    <div>
      {users.map(
        (user, index) =>
          index < 3 && (
            <img
              key={user?.id}
              className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
              src={user?.photoURL || avatar}
              alt={user?.name || "User"}
            />
          )
      )}
    </div>
  );
};

export default LikedBy;
