// importing components
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";

// login function
const Login = ({ setUsername }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const initialValues = { email: "", password: "" };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values) => {
    try {
      // calling data from backend
      const res = await axios.post(
        "https://nodejs-passwordreset-be.onrender.com/api/user/login",
        values
      );
      if (res.status === 200) {
        setUsername(res.data.data.username);
        setAlertType("success");
        setAlertMessage("Login successful!");
        navigate("/dashboard");
      }
    } catch (error) {
      setAlertType("danger");
      setAlertMessage("Login failed. Please check your credentials.");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Page structure and design
  return (
    <div
      className="mx-auto p-5 mt-5 rounded-3"
      style={{ backgroundColor: "#004c91", width: "500px" }}
    >
      <h1 className="text-center mb-4 text-light">Login User</h1>
      {alertMessage && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
      <form
        className="p-5 bg-light w-100 mx-auto rounded-3"
        onSubmit={formik.handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email" value={formik.values.email} onChange={formik.handleChange}/>
          <span className="text-danger">{formik.errors.email}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.password}</span>
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-success mt-3">
            Login User
          </button>
        </div>
        <div className="mt-3">
          <span>You don't have an account? </span>
          <Link
            className="link-primary text-decoration-underline"
            to="/register"
          >
            Register
          </Link>
        </div>
        <div className="mt-3">
          <Link to="/forgot-password" className="link-danger">
            Forgot Password?{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
