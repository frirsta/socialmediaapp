import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
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
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const handleClose = () => setOpen(false);

  console.log(user, userData);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 721);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {user && userData && (
        <div>
          <Card className="md:h-[calc(100vh-2rem)] md:max-w-[20rem] md:w-[220px]  p-4 shadow-xl shadow-blue-gray-900/5 fixed bottom-0 z-10 left-0 right-0 md:relative md:bottom-[unset] md:left-[unset] md:right-[unset]">
            <div className="mb-2 p-4  hidden md:block">
              <Typography variant="h5" color="blue-gray">
                Sidebar
              </Typography>
            </div>
            <List className="flex flex-row md:flex-col md:justify-between md:h-full w-full justify-around">
              <div className="flex md:flex-col w-[60%] md:w-full">
                <ListItem className="md:py-[12px] py-0 md:px-0 flex justify-center md:items-start md:justify-start">
                  <ListItemPrefix className="m-0 mr-0 md:mr-4">
                    <img src={home} className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography className="font-bold hidden md:block">
                    Home
                  </Typography>
                </ListItem>
                <ListItem className="md:py-[12px] py-0 md:px-0 flex justify-center md:items-start md:justify-start">
                  <Link
                    className="md:py-[0px] py-0 md:px-0 flex justify-center md:items-start md:justify-start"
                    to="/explore"
                  >
                    <ListItemPrefix className="m-0 mr-0 md:mr-4">
                      <img src={search} className="h-5 w-5" />
                    </ListItemPrefix>
                    <Typography className="font-bold hidden md:block">
                      Explore
                    </Typography>
                  </Link>
                </ListItem>

                <ListItem
                  className="md:py-[12px] py-0 md:px-0 flex justify-center md:items-start md:justify-start"
                  onClick={handleOpen}
                >
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
              </div>
              <div className="flex md:flex-col w-[40%] md:w-full">
                <hr className="my-2 border-blue-gray-50 md:block hodden" />
                <ListItem className="md:py-[12px] py-0 md:px-0 flex justify-center md:items-start md:justify-start">
                  <Link
                    className="md:py-[0px] py-0 md:px-0 flex justify-center md:items-start md:justify-start"
                    to={`profile/${userData?.uid}`}
                  >
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
                  </Link>
                </ListItem>
                <ListItem
                  className="md:py-[12px] py-0 md:px-0 flex justify-center md:items-start md:justify-start"
                  onClick={signOutUser}
                >
                  <ListItemPrefix className="m-0 mr-0 md:mr-4">
                    <img src={power} className="h-5 w-5" />
                  </ListItemPrefix>
                  <Typography className="font-bold hidden md:block">
                    Log Out
                  </Typography>
                </ListItem>
              </div>
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
