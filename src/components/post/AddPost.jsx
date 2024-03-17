import {
  ButtonGroup,
  Button,
  Dialog,
  Card,
  CardBody,
  Alert,
} from "@material-tailwind/react";
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
import * as Yup from "yup";
import { useFormik } from "formik";

import { doc, setDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { Reducer, postActions, postState } from "../../context/Reducer";
import { AuthContext } from "../../context/Context";
import photo_video from "../../assets/icons/photo_video.png";

export function AddPost({ open, handleOpen, handleClose }) {
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

  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const handleOpenModal = () => {
    handleOpen();
    setProgressBar(0);
  };

  const handleCloseModal = () => {
    formik.resetForm(); // Reset the formik form
    setShowExitConfirmation(false);
    setFile(null);
    setImage(null);
    handleClose();
  };

  const handleExit = () => {
    if (formik.values.text !== "" || file) {
      setShowExitConfirmation(true);
    } else {
      handleCloseModal();
    }
  };

  const handleReturn = () => {
    setShowExitConfirmation(false);
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
    if (formik.values.text !== "") {
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
          text: formik.values.text,
          image: image,
          timestamp: serverTimestamp(),
        });

        handleCloseModal();
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
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
      }
    }
  };

  useEffect(() => {}, [collectionRef]);

  const initialValues = {
    text: "",
  };

  const validationSchema = Yup.object({
    text: Yup.string().required("Please provide a caption for your post"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    handleSubmitPost,
  });

  return (
    <>
      <Dialog
        onClose={handleOpenModal}
        open={open}
        handler={handleOpen}
        handleClose={handleClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto max-w-[24rem] bg-opacity-0">
          <CardBody className="rounded-b-3xl p-0 ">
            <div className="flex justify-end items-center pr-3 pt-3">
              <button onClick={handleExit} className="text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form
              className="min-h-96 rounded-3xl bg-white flex flex-col justify-start items-center"
              onSubmit={handleSubmitPost}
            >
              <div className="absolute bottom-20 w-full flex justify-center items-center mb-3">
                {formik.errors.text && (
                  <Alert
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 100 },
                    }}
                    color="amber"
                    className="text-sm w-full max-w-[380px] p-2 m-0 text-center"
                  >
                    <div> {formik.errors.text} </div>
                  </Alert>
                )}
              </div>
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
                    />
                  )}
                  <textarea
                    autoFocus
                    type="text"
                    name="text"
                    placeholder={`Whats on your mind ${
                      user?.displayName?.split(" ")[0] ||
                      userData?.name?.charAt(0).toUpperCase() +
                        userData?.name?.slice(1)
                    }`}
                    className="p-3 outline-none rounded-b-3xl capitalize text-left w-full bg-[#262626] text-[#e8e8e8] opacity-80"
                    {...formik.getFieldProps("text")}
                    ref={text}
                  ></textarea>
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

      <Dialog
        open={showExitConfirmation}
        className="rounded-3xl mx-auto w-96 max-w-[90vw] bg-transparent shadow-none"
      >
        <CardBody className="flex flex-col justify-center items-center p-0 bg-[#262626] rounded-3xl ">
          <div className="flex flex-col divide-y-reverse divide-y w-full  divide-gray-800 rounded-3xl pt-5">
            <h3 className="text-lg font-semibold mb-2 text-center pt-3">
              {" "}
              Discard post?
            </h3>
            <p className="text-gray-700 text-center pb-3 ">
              If you leave, your edits won't be saved.
            </p>
          </div>
          <div className="flex flex-col divide-y w-full divide-gray-800">
            <Button
              onClick={handleReturn}
              className="p-5 rounded-none bg-[#262626]"
            >
              Cancel
            </Button>

            <Button
              className="text-[#ed4956] p-5 rounded-none rounded-b-3xl bg-[#262626]"
              onClick={handleCloseModal}
            >
              Discard
            </Button>
          </div>
        </CardBody>
      </Dialog>
    </>
  );
}
