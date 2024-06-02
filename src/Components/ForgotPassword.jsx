// importing components
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";


//  Function for ForgotPassword
const ForgotPassword = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  const initialValues = { email: "" };

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email()
      .required("Email is required"),
  });

  // OnSubmit function for the button 
  const onSubmit = async (values) => {
    const btn = document.getElementById("sendEmailBtn");
    try {
      // calling from the backend
      let res = await axios.post(
        "https://nodejs-passwordreset-be.onrender.com/api/user/forgotPassword",
        values
      );
      if (res.status === 201) {
        btn.disabled = true;
        setAlertType("success");
        setAlertMessage("Password reset email sent!");
      }
    } catch (error) {
      setAlertType("danger");
      setAlertMessage("Failed to send password reset email.");
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  // Structure and design of the page
  return (
    <div className="mx-auto p-5 mt-5 rounded-3" style={{ width: "500px", backgroundColor: "#7950f2" }}>
      <h1 className="text-center mb-4 text-light">Forgot Password</h1>
      {alertMessage && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
      <form className="p-5 bg-light w-100 mx-auto rounded-3" onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.email}</span>
        </div>
        <div className="d-grid mt-4">
          <button id="sendEmailBtn" type="submit" className="btn-success btn">
            Send Email
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
          <span className="text-muted"> Already have an account?{" "} <Link to="/" className="link link-primary text-decoration-underline " >
              Login
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
