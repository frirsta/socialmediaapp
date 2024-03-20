import React, { useState } from "react";
import share from "../../../assets/icons/share.png";
import share_outline from "../../../assets/icons/share_outline.png";
import { IconButton } from "@material-tailwind/react";
import { Tooltip } from "@material-tailwind/react";
const ShareButton = ({ size }) => {
  const [hover, setHover] = useState(false);
  const handleHover = () => {
    setHover(!hover);
  };

  return (
    <Tooltip
      content="Coming Soon!"
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0, y: 25 },
      }}
    >
      <IconButton
        size={size}
        variant="text"
        className="rounded-full w-[35px] h-[35px]"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
      >
        {hover ? (
          <>
            <img className="w-[20px] max-w-[unset]" src={share} alt="share" />
          </>
        ) : (
          <>
            <img
              className="w-[20px] max-w-[unset]"
              src={share_outline}
              alt="share outlined"
            />
          </>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default ShareButton;
