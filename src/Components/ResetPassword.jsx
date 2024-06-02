// importing components
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

  const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    validateToken();
  }, []);

  async function validateToken() {
    try {
      // calling data from backend
      let res = await axios.get(
        "https://nodejs-passwordreset-be.onrender.com/api/user/list-all-users"
      );
      if (res.data && res.data.users) {
        const reqUser = res.data.users.find((user) => user.email === email);
        if (reqUser) {
          const tokenCheck = reqUser.randomString === token;
          if (!tokenCheck) {
            navigate("/error");
          }
        }
      }
    } catch (error) { setAlertType("danger"); setAlertMessage("Token validation failed."); console.log(error);
    }
  }

  const initialValues = { password: "", confirmPassword: "" };
  
// Validation schema
  const validationSchema = Yup.object({
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string()
      .min(8)
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const onSubmit = async (values) => {
    try {
      let res = await axios.put(
        "https://nodejs-passwordreset-be.onrender.com/api/user/resetPassword",
        { ...values, email }
      );
      if (res.status === 200) {
        setAlertType("success");
        setAlertMessage("Password reset successful!");
        navigate("/");
      }
    } catch (error) {
      setAlertType("danger");
      setAlertMessage("Password reset failed.");
      console.log(error);
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
      className="mx-auto p-5 mt-5 rounded-3 reset-bg"
      style={{ width: "500px",background:"#5e18df" }}
    >
      <h1 className="text-center mb-4 text-light">Reset Password</h1>
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
          <label htmlFor="password" className="form-label">
            Enter New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter New password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.password}</span>
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          <span className="text-danger">{formik.errors.confirmPassword}</span>
        </div>
        <div className="d-grid mt-4">
          <button type="submit" className="btn-success btn">
            Set Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
