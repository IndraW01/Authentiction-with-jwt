import userService from "../service/user-service.js";

const register = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.register(request);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: result
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const request = req.body;
    const result = await userService.login(request);

    res.cookie('refreshToken', result.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    res.status(200).json({
      code: 200,
      status: "OK",
      data: {
        token: result.accessToken
      }
    });
  } catch (e) {
    next(e);
  }
}

const refresh = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const result = await userService.refresh(token);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: result
    });
  } catch (e) {
    next(e)
  }
}

const current = async (req, res, next) => {
  try {
    const userEmail = req.user.email;
    const result = await userService.current(userEmail);

    res.status(200).json({
      code: 200,
      status: "OK",
      data: result
    });
  } catch (e) {
    next(e);
  }
}

const logout = async (req, res, next) => {
  try {
    const token = req.cookies.refreshToken;
    const result = await userService.logout(token);

    res.clearCookie('refreshToken');
    res.status(200).json({
      code: 200,
      status: "OK",
      data: result
    });
  } catch (e) {
    next(e)
  }
}

export default {
  register,
  login,
  current,
  refresh,
  logout
}