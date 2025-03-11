import React, { useState, useEffect } from "react";
import "/src/assets/style.css";
import { useNavigate } from "react-router-dom";
import logo from "/src/assets/Healthlink-logo.svg";


const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  /* const handleResendOTP = async () => {
    try {
      const response = await fetch(
        "https://coocoo-app.onrender.com/auth/resend-otp/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to resend OTP. Please try again.");
      }

      setShowResendOTP(false);
      navigate("/verify-email", { state: { email: formData.email } });
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
 */

  const signUpNav = () => {
    navigate("/signup");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const guestLogin = (e) => {
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
     
          <img src={logo} alt="CooCoo Logo" />
          <h1>Login</h1>
          <form onSubmit={handleLogin}>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <div className="forgot-password">
              <a href="/forgot-password">Forgot your Password?</a>
            </div>

            <button className="login-btn" type="submit">
              Login
            </button>
          </form>

          <div className="signup-footer">
            <span> Don't have an account? </span>
            <button className="signup-btn" type="button" onClick={signUpNav}>
              Sign Up
            </button>
          </div>

          <div className="guest-footer">
            <button className="guest-btn" type='button' onClick={guestLogin}>
                Continue as Guest
             
            </button>

          </div>
      
      
    </div>
  );
};

export default Login;
