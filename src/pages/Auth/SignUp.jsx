import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  CardFooter,
  CardHeader,
  CardBody,
  Alert,
} from "@material-tailwind/react";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Context";
import { auth, onAuthStateChanged } from "../../firebase/firebase";
import { useFormik } from "formik";
import google from "../../assets/icons/google.png";
const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const { registerWithEmailAndPassword, signInWithGoogle, error } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [displayError, setDisplayError] = useState(false);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, [navigate]);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    termsAndConditions: false,
  };
  const validationSchema = Yup.object({
    termsAndConditions: Yup.boolean().oneOf(
      [true],
      "Accept terms and conditions"
    ),
    name: Yup.string()
      .required("Required")
      .min("3", "Username is too short, must be at least 6 characters")
      .matches(/^[a-zA-Z]+$/, "Username must be alphabetic"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .required("Required")
      .min("8", "Password is too short, must be at least 8 characters"),
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password, termsAndConditions } = formik.values;
    if (formik.isValid && termsAndConditions === true) {
      try {
        setLoading(true);
        await registerWithEmailAndPassword(name, email, password);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setDisplayError(true);
      }
    } else if (!termsAndConditions) {
      setDisplayError(true);
    } else {
      setDisplayError(true);
    }
  };
  const formik = useFormik({ initialValues, validationSchema, handleSubmit });
  return (
    <>
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
              className="w-100 flex flex-col justify-center items-center gap-3"
            >
              <CardHeader
                shadow={false}
                className="mb-0 grid sm:mb-4 h-28 place-items-center"
              >
                <Typography variant="h3" color="blue-gray">
                  Sign Up
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  Welcome! Enter your details to register.
                </Typography>
              </CardHeader>
              <CardBody className="flex flex-col justify-center items-center gap-3 sm:pt-6 sm:pb-6 pt-0 pb-0">
                <form
                  onSubmit={handleSubmit}
                  className=" mb-0 w-70 max-w-screen-lg sm:w-96 sm:mb-2"
                >
                  <div className="mb-0 flex flex-col gap-4 sm:mb-1">
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Name
                    </Typography>
                    <Input
                      name="name"
                      type="name"
                      size="lg"
                      placeholder="name@mail.com"
                      className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      {...formik.getFieldProps("name")}
                    />
                    <div>
                      {displayError && formik.errors.name && (
                        <Alert color="red" className="text-sm">
                          {formik.errors.name}
                        </Alert>
                      )}
                    </div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Your Email
                    </Typography>
                    <Input
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
                      {displayError && formik.errors.email && (
                        <Alert color="red" className="text-sm">
                          {formik.errors.email}
                        </Alert>
                      )}
                    </div>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      className="-mb-3"
                    >
                      Password
                    </Typography>
                    <Input
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
                    {formik.errors.password && displayError && (
                      <Alert color="red" className="text-sm">
                        {formik.errors.password}
                      </Alert>
                    )}
                  </div>
                  <div>
                    <Checkbox
                      checked={formik.values.termsAndConditions}
                      name="termsAndConditions"
                      label={
                        <Typography
                          variant="small"
                          color="gray"
                          className="flex items-center"
                        >
                          I agree the&nbsp;
                          <a
                            href="#"
                            className="font-bold transition-colors hover:text-gray-900 underline"
                          >
                            Terms and Conditions
                          </a>
                        </Typography>
                      }
                      containerProps={{ className: "-ml-2.5" }}
                      {...formik.getFieldProps("termsAndConditions")}
                    />
                  </div>
                  <div>
                    {displayError && formik.errors.termsAndConditions && (
                      <Alert color="red" className="text-sm">
                        {formik.errors.termsAndConditions}
                      </Alert>
                    )}
                  </div>
                  <Button
                    size="lg"
                    type="submit"
                    className="flex justify-center items-center gap-3 mt-3 sm:mt-4"
                    fullWidth
                  >
                    Sign up
                  </Button>
                  <Button
                    size="lg"
                    color="white"
                    className="flex justify-center items-center gap-3 mt-3 sm:mt-4"
                    onClick={signInWithGoogle}
                    fullWidth
                  >
                    <div className="h-3 w-3 sm:h-5 sm:w-5">
                      <img src={google} alt="google" />
                    </div>
                    Sign up with google
                  </Button>
                </form>
                {error && (
                  <Alert color="red" className="text-sm">
                    {error}
                  </Alert>
                )}
              </CardBody>
              <CardFooter className="pt-0">
                <Typography
                  color="gray"
                  variant="small"
                  className="mt-1 flex justify-center gap-1"
                >
                  Already have an account?{" "}
                  <Link to={"/signin"} className="font-bold text-gray-900">
                    Sign In
                  </Link>
                </Typography>
              </CardFooter>
            </Card>
          </div>
        )}
      </>
    </>
  );
};

export default SignUp;
