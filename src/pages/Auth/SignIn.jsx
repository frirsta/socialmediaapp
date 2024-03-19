import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Alert,
  Button,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { Card, Input, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import { auth, onAuthStateChanged } from "../../firebase/firebase";
import google from "../../assets/icons/google.png";
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, loginWithEmailAndPassword, error } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        navigate("/signin");
        setLoading(false);
      }
    });
  }, [navigate]);

  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required"),
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formik.values;
    if (formik.isValid === true) {
      try {
        setLoading(true);
        await loginWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center justify-items-center items-center h-screen m-auto">
          loading
        </div>
      ) : (
        <div className="flex flex-col justify-center justify-items-center items-center h-screen m-auto">
          <Card
            color="transparent"
            shadow={false}
            className="w-100 flex flex-col justify-center ite"
          >
            {error && (
              <Alert color="red" className="text-sm z-50">
                {error}
              </Alert>
            )}
            <CardHeader
              shadow={false}
              className="mb-4 grid h-28 place-items-center"
            >
              <Typography variant="h3" color="blue-gray">
                Sign In
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Welcome! Sign in to your account
              </Typography>
            </CardHeader>
            <CardBody className="flex flex-col justify-center items-center gap-3">
              <form
                onSubmit={handleSubmit}
                className=" mb-2 w-70 max-w-screen-lg sm:w-96"
              >
                <div className="mb-1 flex flex-col gap-4">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Your Email
                  </Typography>
                  <Input
                    autoComplete="email"
                    name="email"
                    type="email"
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    {...formik.getFieldProps("email")}
                  />
                  <div>
                    {formik.touched.email && formik.errors.email && (
                      <Alert color="red" className="text-sm">
                        {formik.errors.email}
                      </Alert>
                    )}
                  </div>
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Password
                  </Typography>
                  <Input
                    autoComplete="current-password"
                    name="password"
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    {...formik.getFieldProps("password")}
                  />
                </div>
                <div>
                  {formik.errors.password && formik.touched.password && (
                    <Alert color="red" className="text-sm">
                      {formik.errors.password}
                    </Alert>
                  )}
                </div>
                <div>
                  <Typography
                    color="gray"
                    className="mt-8 font-bold text-sm text-right mr-3"
                  >
                    <Link
                      to={"/reset"}
                      className="mt-1 font-bold text-gray-800"
                    >
                      Forget password?
                    </Link>
                  </Typography>
                </div>
                <Button
                  size="lg"
                  type="submit"
                  className="flex justify-center items-center gap-3 mt-4"
                  fullWidth
                >
                  Sign in
                </Button>
                <Button
                  size="lg"
                  color="white"
                  className="flex justify-center items-center gap-3 mt-4"
                  onClick={signInWithGoogle}
                  fullWidth
                >
                  <div className="h-5 w-5">
                    <img src={google} alt="google" />
                  </div>
                  Sign in with google
                </Button>
              </form>
            </CardBody>
            <CardFooter className="pt-0">
              <Typography
                color="gray"
                variant="small"
                className="mt-1 flex justify-center gap-1"
              >
                Don't have an account?{" "}
                <Link to={"/signup"} className="font-bold text-gray-900">
                  Sign Up
                </Link>
              </Typography>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default SignIn;
