import model from "../model";
import jwt from "../utils/jwt";
import sign from "../utils/sign";

/**
 * 帐号密码登录
 * @param {*} ctx 
 * @param {*} next 
 */
const account = async (ctx, next) => {
  const { username: authName, password } = ctx.request.body;
  if (!authName || !password) {
    ctx.throw(401, "缺少参数");
  }

  const authType = "account";
  const authCode = sign.signPwd(authName, password);
  const auth = await model.Auth.findOne({
    where: { authType, authName, authCode },
  });
  if (!auth) {
    ctx.throw(401, "用户名或密码错误");
  }
  if (!auth.isEnabled) {
    ctx.throw(401, "此帐号已禁用");
  }
  if (auth.expireTime && new Date(auth.expireTime).getTime() < Date.now()) {
    ctx.throw(401, "此帐号已过期");
  }

  const { userId } = auth;
  const authToken = jwt.makeToken({ authType, authName, userId });
  ctx.body = {
    message: "登录成功",
    authToken,
  };

  next();
};

/**
 * 手机登录
 * @param {*} ctx 
 * @param {*} next 
 */
const phone = async (ctx, next) => {
  // ...
  next();
};

/**
 * 微信登录
 * @param {*} ctx 
 * @param {*} next 
 */
const wechat = async (ctx, next) => {
  // ...
  next();
};

export default {
  account,
  phone,
  wechat,
};
