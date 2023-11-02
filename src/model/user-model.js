import { prisma } from "../application/database.js"
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";

const getUserEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  });

  return user;
}

const createUser = (name, email, password) => {
  return prisma.user.create({
    data: {
      name,
      email,
      password
    },
    select: {
      name: true,
      email: true,
      created_at: true
    }
  })
}

const checkUserLogin = async (email, password) => {
  const user = await getUserEmail(email);
  if (!user) {
    throw new ResponseError(401, 'Unauthorized', 'Email or password wrong');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw new ResponseError(401, 'Unauthorized', 'Email or password wrong');
  }

  return user;
}

const updateToken = (email, refreshToken) => {
  return prisma.user.update({
    where: {
      email
    },
    data: {
      token_refresh: refreshToken
    }
  });
};

const checkUserTokenRefresh = async (token) => {
  const user = await prisma.user.findFirst({
    where: {
      token_refresh: token
    }
  });

  return user;
}

export default {
  getUserEmail,
  createUser,
  checkUserLogin,
  updateToken,
  checkUserTokenRefresh
}
