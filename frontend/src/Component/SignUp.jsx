import { useState } from "react";
import styles from "./SignUp.module.css";
import CloseIcon from "@mui/icons-material/Close";
import googleIcon from "../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    // Storing user data in localStorage
    localStorage.setItem("user", JSON.stringify(formData));

    // Redirect to the login page or another page after successful sign-up
    navigate("/login");

    // Clear form fields and error
    setFormData({ name: "", email: "", password: "" });
    setError("");
  };

  return (
    <div className={styles.outer}>
      <div className={styles.card}>
        <div className={styles.main}>
          <div className={styles.header}>
            <h2 className={styles.head}>Create Your Account</h2>
            <p className={styles.p}>
              Unlock Your World of Entertainment, Join the YouTube Community
            </p>
          </div>

          {/* Form for Sign-Up */}
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              value={formData.name}
              onChange={handleChange}
            />
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className={styles.input}
              value={formData.email}
              onChange={handleChange}
            />
            <br />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            {error && <p className={styles.error}>{error}</p>}
            <button type="submit" className={styles.button}>
              Create Your Account
            </button>
          </form>

          <div className={styles.close}>
            <CloseIcon className={styles.closeIcon} />
          </div>

          <div className={styles.footer}>
            <p className={styles.p}>
              Already have an account?{" "}
              <Link to="/login" className={styles.link}>
                Sign In
              </Link>
            </p>

            <div className={styles.orContainer}>
              <hr className={styles.line} />
              <span className={styles.orText}>OR</span>
              <hr className={styles.line} />
            </div>

            <Link to="/googleAuth">
              <div className={styles.signMethod}>
                <img
                  src={googleIcon}
                  className={styles.googleIcon}
                  alt="google-logo"
                />
                <p>Sign In with Google</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}