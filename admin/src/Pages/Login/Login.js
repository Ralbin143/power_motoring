import { LoadingButton } from "@mui/lab";
import { Alert, LinearProgress, TextField } from "@mui/material";
import React, { useState } from "react";
import { instance } from "../../Const/ApiHeader";
import { LOGIN } from "../../Const/ApiConst";

function Login() {
  const [uname, setUname] = useState("");
  const [unameError, setUnameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const unameEntry = (e) => {
    setUnameError("");
    setUname(e.target.value);
  };
  const passwordEntry = (e) => {
    setPasswordError("");
    setPassword(e.target.value);
  };

  const loginAction = async () => {
    if (uname === "") {
      setUnameError("User name cannot be empty");
    } else if (password === "") {
      setPasswordError("Password cannot be empty");
    } else {
      setLoginLoading(true);
      const data = {
        uname: uname,
        password: password,
      };
      try {
        await instance
          .post(LOGIN, data)
          .then((response) => {
            sessionStorage.setItem("wsstfaarvav", response.data.token);
            setLoginLoading(false);
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
            setLoginLoading(false);
            setLoginError(true);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const loginContainer = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    display: "flex",
    flexDirection: "column",
    background: "#fff",
  };

  return (
    <div>
      <div style={loginContainer}>
        {loginLoading ? <LinearProgress /> : ""}
        {loginError ? <Alert color="error">Invalid credentials</Alert> : ""}
        <TextField
          className="m-4"
          error={unameError}
          helperText={unameError}
          size="small"
          label={"User ID"}
          onChange={(e) => unameEntry(e)}
        />
        <TextField
          className="m-4"
          error={passwordError}
          helperText={passwordError}
          size="small"
          type="password"
          label={"Password"}
          onChange={(e) => passwordEntry(e)}
        />
        <LoadingButton
          className="m-4"
          loading={loginLoading}
          variant="contained"
          onClick={() => loginAction()}
        >
          Login
        </LoadingButton>
      </div>
    </div>
  );
}

export default Login;
