import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import { Button, Input } from "@material-tailwind/react";
import { db } from "../../firebase/firebase";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";

const Search = () => {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(query(collection(db, "users")));
      if (querySnapshot.empty) {
        console.log("No users found");
        return [];
      }

      const usersData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return usersData;
    } catch (error) {
      console.error("Error fetching users:", error.message);
      throw error;
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching Users:", error.message);
      }
    };
    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };
  return (
    <div>
      <h3>Explore</h3>
      <div>
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Search users by name"
        />
      </div>
      <div>
        <ul>
          {input &&
            users
              .filter((user) =>
                user.name.toLowerCase().includes(input.toLowerCase())
              )
              .map((user, index) => (
                <li key={index}>
                  {user.name} -{" "}
                  <Link to={`/profile/${user.uid}`}>View Profile</Link>
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default Search;
