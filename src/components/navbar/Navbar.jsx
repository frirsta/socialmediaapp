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
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  console.log(user, userData);

  return (
    <>
      {user && userData && (
        <div>
          <Card className="h-[calc(100vh-2rem)] md:max-w-[20rem] md:w-full w-[68px]  p-4 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 p-4  hidden md:block">
              <Typography variant="h5" color="blue-gray">
                Sidebar
              </Typography>
            </div>
            <List>
              <ListItem className="py-[12px] px-0">
                <ListItemPrefix className="m-0 mr-0 md:mr-4">
                  <img src={home} className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="font-bold hidden md:block">
                  Home
                </Typography>
              </ListItem>
              <ListItem className="py-[12px] px-0">
                <ListItemPrefix className="m-0 mr-0 md:mr-4">
                  <img src={search} className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="font-bold hidden md:block">
                  Search
                </Typography>
              </ListItem>

              <ListItem className="py-[12px] px-0" onClick={handleOpen}>
                <ListItemPrefix className="m-0 mr-0 md:mr-4">
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
                <Typography className="font-bold hidden md:block">
                  Create
                </Typography>
              </ListItem>
              <Link to={`profile/${userData?.uid}`}>
                <ListItem className="py-[12px] px-0">
                  <ListItemPrefix className="m-0 mr-0 md:mr-4">
                    <UserAvatar
                      image={user?.photoURL}
                      width={"25px"}
                      height={"25px"}
                    />
                  </ListItemPrefix>
                  <Typography className="font-bold hidden md:block">
                    Profile
                  </Typography>
                </ListItem>
              </Link>
              <ListItem className="py-[12px] px-0" onClick={signOutUser}>
                <ListItemPrefix className="m-0 mr-0 md:mr-4">
                  <img src={power} className="h-5 w-5" />
                </ListItemPrefix>
                <Typography className="font-bold hidden md:block">
                  Log Out
                </Typography>
              </ListItem>
            </List>
          </Card>
          <AddPost
            open={open}
            handleOpen={handleOpen}
            handleClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default NavBar;
