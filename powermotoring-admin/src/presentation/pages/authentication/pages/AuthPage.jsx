import MainInput from "../../../components/MainInput";
import MainButtons from "../../../components/MainButtons";
import { Fingerprint } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGIN_SLICE_ITEM,
  setAuthPassword,
  setAuthUname,
} from "../../../../data/store/Auth/AuthSlice";

function AuthPage() {
  const dispatch = useDispatch();
  const { uname, password } = useSelector((state) => state?.auth);

  const loginAction = () => {
    const data = {
      uname,
      password,
    };
    dispatch(LOGIN_SLICE_ITEM(data));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #2596be, #f4f8fb)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          boxShadow: " rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "15px",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "350px",
          background: "white",
        }}
      >
        <Fingerprint style={{ fontSize: "50px", color: "#26272e" }} />
        <div style={{ fontWeight: "500", fontSize: "2rem" }}>Sign in</div>
        <div
          style={{ color: "#b9b9b9", fontSize: "13px", textAlign: "center" }}
        >
          Please enter your login username and password to access the admin
          panel.
        </div>
        <div className="d-flex flex-column gap-2 w-100">
          <MainInput
            label="Username"
            value={uname}
            onChange={(e) => dispatch(setAuthUname(e.target.value))}
          />
          <MainInput.Password
            label="Password"
            value={password}
            onChange={(e) => dispatch(setAuthPassword(e.target.value))}
          />
          <MainButtons label={"Sign in"} onClick={loginAction} />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
