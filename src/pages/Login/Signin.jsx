import React, { useState } from "react";
import styles from "./Signin.module.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const submitHandler = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userData.username, userData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
      })
      .catch((error) => {
        if (error.code.includes("wrong-password")) {
          setError("Wrong Password");
        } else if (error.code.includes("user-not-found")) {
          setError("User not found");
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <h1>Sign in</h1>
        <div className={styles.inputField}>
          <label htmlFor="username">Username</label>
          <InputText
            id="username"
            value={userData.username}
            aria-describedby="username-help"
            onChange={(e) =>
              setUserData({ ...userData, username: e.target.value })
            }
          />
        </div>
        <div className={styles.inputField}>
          <label htmlFor="password">Password</label>
          <Password
            id="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            aria-describedby="username-help"
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <div className={styles.userText}>
          <p>Not an user? </p>{" "}
          <span
            onClick={() => {
              navigate("/signup");
            }}
          >
            Sign up
          </span>
        </div>
        <div className={styles.btnGrp}>
          <Button onClick={submitHandler} label="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
