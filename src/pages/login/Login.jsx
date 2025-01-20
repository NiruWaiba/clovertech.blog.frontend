import { useContext, useRef, useState } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../auth/context";
import axiosInstance from "../../api/axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const navigate = useNavigate();

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    setError(null);

    try {
      const res = await axiosInstance.post("/api/Auth/Login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });

      // Save token to sessionStorage
      const token = res.data.data?.token;
      if (token) {
        sessionStorage.setItem("token", token);
        localStorage.setItem("user", res.data.data);
      }

      // Dispatch successful login
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { ...res.data, token },
      });

      // Navigate to home page
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);

      // Set error message
      setError(
        err.response?.data?.message ||
          "Invalid username or password. Please try again."
      );

      // Dispatch login failure
      dispatch({ type: "LOGIN_FAILURE" });
    } finally {
      dispatch({ type: "LOGIN_END" });
    }
  };

  return (
    <div className="login">
      <span className="login-title">Login</span>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          className="login-input"
          type="text"
          placeholder="Enter your username"
          ref={userRef}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          className="login-input"
          type="password"
          placeholder="Enter your password"
          ref={passwordRef}
          required
        />

        <button className="login-button" type="submit" disabled={isFetching}>
          {isFetching ? "Logging in..." : "Login"}
        </button>

        {error && <span className="error">{error}</span>}
      </form>
      <div className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default Login;
