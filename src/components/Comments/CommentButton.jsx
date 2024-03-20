import { IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import chat from "../../assets/icons/chat.png";
import chat_outline from "../../assets/icons/chat_outline.png";
const CommentButton = ({ handleOpenModal, size }) => {
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    setHover(true);
  };
  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div>
      <IconButton
        size={size}
        variant="text"
        className="rounded-full  w-[35px] h-[35px]"
        onClick={handleOpenModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hover ? (
          <>
            <img className="w-[20px] max-w-[unset]" src={chat} alt="comment" />
          </>
        ) : (
          <>
            <img
              className="w-[20px] max-w-[unset]"
              src={chat_outline}
              alt="comment outlined"
            />
          </>
        )}
      </IconButton>
    </div>
  );
};

export default CommentButton;
