import React, { useState } from "react";
import styles from "./Signup.module.css";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

  const submitHandler = () => {
    const auth = getAuth();
    if (userData.password === userData.confirmPassword) {
      createUserWithEmailAndPassword(
        auth,
        userData.username,
        userData.password,
        userData.role
      )
        .then((userCredential) => {
          const user = userCredential.user;
          navigate("/login");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setError("Already in use");
          } else if (error.code === "auth/invalid-email") {
            setError("Invalid Mail");
          }
        });
    } else {
      setError("Password Mismatch");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <h1>Sign up</h1>
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
        <div className={styles.inputField}>
          <label htmlFor="password">Confirm Password</label>
          <Password
            id="confirm-password"
            value={userData.confirmPassword}
            onChange={(e) =>
              setUserData({ ...userData, confirmPassword: e.target.value })
            }
            aria-describedby="username-help"
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
        <div className={styles.userText}>
          <p>Existing user? </p>{" "}
          <span
            onClick={() => {
              navigate("/login");
            }}
          >
            Sign in
          </span>
        </div>
        <div className={styles.btnGrp}>
          <Button onClick={submitHandler} label="Sign up" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
