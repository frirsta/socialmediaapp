import { IconButton } from "@material-tailwind/react";
import React, { useState } from "react";
import chat from "../../assets/icons/chat.png";
import chat_outline from "../../assets/icons/chat_outline.png";
const CommentButton = ({ handleOpenModal }) => {
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
        size="lg"
        variant="text"
        className="rounded-full"
        onClick={handleOpenModal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hover ? (
          <>
            <img src={chat} alt="comment" />
          </>
        ) : (
          <>
            <img src={chat_outline} alt="comment outlined" />
          </>
        )}
      </IconButton>
    </div>
  );
};

export default CommentButton;
