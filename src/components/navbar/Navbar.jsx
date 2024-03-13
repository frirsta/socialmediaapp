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
const NavBar = () => {
  const { user, userData, signOutUser } = useContext(AuthContext);
  const [open, setOpen] = useState(0);

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  console.log(user, userData);

  return (
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
        <Accordion
          open={open === 1}
          icon={
            <img
              src={downchevron}
              alt="down chevron"
              className={`mx-auto h-4 w-4 transition-transform ${
                open === 1 ? "rotate-180" : ""
              }`}
            />
          }
        >
          <ListItem className="p-0" selected={open === 1}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="border-b-0 p-3"
            >
              <Typography color="blue-gray" className="mr-auto font-normal">
                Dashboard
              </Typography>
            </AccordionHeader>
          </ListItem>
          <AccordionBody className="py-1">
            <List className="p-0">
              <ListItem>Analytics</ListItem>
              <ListItem>Reporting</ListItem>
              <ListItem>Projects</ListItem>
            </List>
          </AccordionBody>
        </Accordion>
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
  );
};

export default NavBar;
