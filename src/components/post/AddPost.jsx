import { Button, Dialog, Card, CardBody } from "@material-tailwind/react";
import React, {
  useContext,
  useReducer,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Reducer, postActions, postState } from "../../context/Reducer";
import { AuthContext } from "../../context/Context";
import photo_video from "../../assets/icons/photo_video.png";

export function AddPost({ open, handleOpen }) {
  const { user, userData } = useContext(AuthContext);
  const text = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const postRef = doc(collection(db, "posts"));
  const document = postRef.id;
  const [state, dispatch] = useReducer(Reducer, postState);
  const { HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleOpenModal = () => {
    handleOpen();
    setProgressBar(0);
  };

  const handleUpload = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);


    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        if (file) {
          await submitImage(); 
        }

        await setDoc(postRef, {
          documentId: document,
          uid: user?.uid || userData?.uid,
          logo: user?.photoURL,
          name: user?.displayName || userData?.name,
          email: user?.email || userData?.email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });

        text.current.value = "";
        setFile(null);
        setImage(null);
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            alert(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {}, [collectionRef]);

  return (
    <>
      <Dialog
        onClose={handleOpenModal}
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto max-w-[24rem] bg-opacity-0">
          <CardBody className="rounded-b-3xl p-0 ">
            <form
              className="min-h-96 rounded-3xl bg-white flex flex-col justify-start items-center"
              onSubmit={handleSubmitPost}
            >
              {file && (
                <div className="bg-[#262626] rounded-3xl text-right overflow-hidden">
                  <Button
                    variant="text"
                    type="submit"
                    className="capitalize font-bold text-[#0066CC] text-base"
                  >
                    Share
                  </Button>

                  <span
                    style={{ width: `${progressBar}%` }}
                    className="bg-blue-700 rounded-md"
                  ></span>
                  {image && (
                    <img
                      className="object-cover"
                      src={image}
                      alt="previewImage"
                    ></img>
                  )}
                  <input
                    type="text"
                    name="text"
                    placeholder={`Whats on your mind ${
                      user?.displayName?.split(" ")[0] ||
                      userData?.name?.charAt(0).toUpperCase() +
                        userData?.name?.slice(1)
                    }`}
                    className="outline-none rounded-b-3xl capitalize text-center w-full p-3 bg-[#262626] text-[#e8e8e8]"
                    ref={text}
                  ></input>
                </div>
              )}
              {!file && (
                <div className="bg-[#262626] rounded-3xl w-full min-h-96 py-3 px-6 flex flex-col">
                  <span className="rounded-lg capitalize font-bold text-[#e8e8e8] text-base pb-3">
                    Create new post
                  </span>
                  <hr className="opacity-20" />
                  <label
                    htmlFor="addImage"
                    className="cursor-pointer object-cover flex flex-col justify-evenly items-center min-h-96"
                  >
                    <img src={photo_video} alt="Add image" className="" />
                    <Button
                      disabled
                      color="blue"
                      size="sm"
                      className="text-sm capitalize px-10 py-1 disabled:opacity-1"
                    >
                      Select from computer
                    </Button>
                  </label>
                  <input
                    className=""
                    id="addImage"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleUpload}
                  ></input>
                </div>
              )}
            </form>
          </CardBody>
        </Card>
      </Dialog>
    </>
  );
}
