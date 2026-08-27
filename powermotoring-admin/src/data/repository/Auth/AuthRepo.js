import { LOGIN } from "../../constants/ApiConst";
import { INSTANCE } from "../../constants/ApiHeader";

export const LoginAction = async (authData) => {
  const response = await INSTANCE.post(LOGIN, authData);
  console.log(response);

  return response.data?._id;
};

export const AuthRepository = { LoginAction };
export default AuthRepository;
