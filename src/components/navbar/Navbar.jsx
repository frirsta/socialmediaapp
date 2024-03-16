import React, { useContext, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import downchevron from "../../assets/icons/downchevron.png";
import power from "../../assets/icons/power.png";
import home from "../../assets/icons/home.png";
import search from "../../assets/icons/search.png";
import { AuthContext } from "../../context/Context";
import UserAvatar from "../profile/UserAvatar";
import { Link } from "react-router-dom";
import { AddPost } from "../post/AddPost";
const NavBar = () => {
  const { user, userData, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen((cur) => !cur);

  console.log(user, userData);

  return (
    <>
      <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            Sidebar
          </Typography>
        </div>
        <List>
          <ListItem>
            <ListItemPrefix>
              <img src={home} className="h-5 w-5" />
            </ListItemPrefix>
            Home
          </ListItem>
          <ListItem>
            <ListItemPrefix>
              <img src={search} className="h-5 w-5" />
            </ListItemPrefix>
            Search
          </ListItem>

          <ListItem onClick={handleOpen}>
            <ListItemPrefix>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </ListItemPrefix>
            Create
          </ListItem>
          <Link to={`profile/${userData?.uid}`}>
            <ListItem>
              <ListItemPrefix>
                <UserAvatar image={user?.photoURL} width={30} height={30} />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <ListItem onClick={signOutUser}>
            <ListItemPrefix>
              <img src={power} className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </List>
      </Card>
      <AddPost open={open} handleOpen={handleOpen} />
    </>
  );
};

export default NavBar;
