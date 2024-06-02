// importing components
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

// function for register
const Register = () => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  // setting initial values
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // validation schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email()
      .required("Email is required"),
    password: Yup.string().min(8).required("Password is required"),
  });

  // Onsubmit function
  const onSubmit = async (values) => {
    try {
      // Calling data from backend
      let res = await axios.post(
        "http://localhost:5000/api/user/register",
        values
      );

      if (res.status === 201) {
        setAlertType("success");
        setAlertMessage("Registration successful! Redirecting to login.");
        setTimeout(() => {
          navigate("/");
        }, 1000); // Redirect after 1 seconds
      }
      // for error handling
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setAlertType("warning");
        setAlertMessage("User already exists. Please use a different email.");
      } else {
        setAlertType("danger");
        setAlertMessage("Registration failed. Please try again.");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Structure for Register page
  return (
    <div className="mx-auto p-5 mt-5 rounded-3" style={{ width: "500px", backgroundColor: "#5e18df" }}>

      <h1 className="text-center mb-4 text-light">Register User</h1>
      {alertMessage && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
      <form
        className="p-5 bg-light w-100 mx-auto rounded-3" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input type="text" className="form-control" id="username" placeholder="Enter your username" value={formik.values.username} onChange={formik.handleChange}/>
          <span className="text-danger">{formik.errors.username}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.email}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="password" placeholder="Enter your password" value={formik.values.password} onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.password}</span>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success mt-3">
            Register
          </button>
        </div>

        <div className="mt-3">
          <span className="text-muted">
            Already have an account?{" "}
            <Link to="/" className="link link-primary text-decoration-underline ">
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
