import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import React from "react";

const Post = ({
  id,
  image,
  photoURL,
  logo,
  name,
  text,
  timestamp,
  uid,
  email,
}) => {
  return (
    <div className="bg-gray-100 p-4">
      <Card className="bg-white border rounded-sm max-w-md">
        <CardHeader
          className="flex items-center justify-between"
          shadow={false}
          floated={false}
        >
          <div className="flex items-center mb-3">

            <Typography className="ml-3 capitalize">{name}</Typography>
            <Typography className="ml-3 text-gray-500 text-xs">{text}</Typography>
          </div>

        </CardHeader> 
        <img src={image} alt={text} className="h-full w-full object-cover" />


        <CardFooter className="flex flex-col justify-between pt-0">
      <div>Footer</div>    
        </CardFooter>
      </Card>
    </div>
  );
};

export default Post;
