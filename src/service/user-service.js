import userModel from "../model/user-model.js";
import { userGetValidation, userLoginValidation, userRegisterValidation } from "../validation/user-validation.js"
import { validation } from "../validation/validation.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { TokenExpiredError } = jwt;

const register = async (request) => {
  // lakukan validasi
  let { name, email, password } = validation(userRegisterValidation, request);
  // cek email unique
  const user = await userModel.getUserEmail(email)
  if (user) {
    throw new ResponseError(400, 'Bad Request', 'Email is already used');
  }
  // bcrypt password
  password = await bcrypt.hash(password, 10);
  // create user
  const createUser = await userModel.createUser(name, email, password);

  return createUser;
}

const login = async (request) => {
  // lakukan validasi
  let { email, password } = validation(userLoginValidation, request);
  // cek apakah ada email dan passwordnya
  const user = await userModel.checkUserLogin(email, password);
  // create accesToken
  const accessToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SCREET_KEY, {
    expiresIn: "20s"
  })
  const refreshToken = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SCREET_KEY, {
    expiresIn: "1d"
  })
  // update token refresh
  await userModel.updateToken(user.email, refreshToken);

  return { accessToken, refreshToken };
}

const refresh = async (token) => {
  // cek tokennya ada atau tidak
  if (!token) {
    throw new ResponseError(401, 'Unauthorized', 'Reftesh token not found');
  }
  // cek tokennya sama dengan user
  const user = await userModel.checkUserTokenRefresh(token);
  if (!user) {
    throw new ResponseError(401, 'Unauthorized', 'Reftesh token is invalid');
  }
  // verify token dan kirim tokennya
  try {
    const decode = jwt.verify(token, process.env.JWT_SCREET_KEY);
    const accessToken = jwt.sign({ id: decode.id, name: decode.name, email: decode.email }, process.env.JWT_SCREET_KEY, {
      expiresIn: "20s"
    })

    return { token: accessToken };
  } catch (e) {
    throw new TokenExpiredError(e.message, e.expiredAt);
  }
};

const current = async (email) => {
  email = validation(userGetValidation, email);

  const { name, email: userEmail, created_at } = await userModel.getUserEmail(email);

  return {
    name,
    email: userEmail,
    created_at
  }
}

const logout = async (token) => {
  if (!token) {
    return 'OK';
  }
  // cek tokennya sama dengan user
  const user = await userModel.checkUserTokenRefresh(token);
  if (!user) {
    return 'OK';
  }
  // update token refresh
  await userModel.updateToken(user.email, null);

  return 'OK';
}

export default {
  register,
  login,
  refresh,
  logout,
  current
}