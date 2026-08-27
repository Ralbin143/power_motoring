import AuthRepository from "../../repository/Auth/AuthRepo";

const AuthAction = async (data) => {
  const result = await AuthRepository.LoginAction(data);
  sessionStorage.setItem("wsstfaarvav", result);
  window.location.reload();
  return result;
};

export const AuthService = { AuthAction };
export default AuthService;
