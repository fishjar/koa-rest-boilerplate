import model from "../model";
import jwt from "../utils/jwt";
import sign from "../utils/sign";

/**
 * 登录
 */
const account = async (ctx, next) => {
  const { username: authName, password } = ctx.request.body;
  if (!authName || !password) {
    ctx.throw(401, "缺少参数");
  }

  const authType = "account";
  const isEnabled = true;
  const authCode = sign.signPwd(authName, password);
  const auth = await model.Auth.findOne({
    where: { authType, authName, authCode, isEnabled },
  });
  if (!auth) {
    ctx.throw(401, "用户名或密码错误");
  }

  const { userId } = auth;
  const authToken = jwt.makeToken({ authType, authName, userId });
  ctx.body = {
    message: "登录成功",
    authToken,
  };

  await next();
};

const phone = async (ctx, next) => {
  // ...
  await next();
};

const wechat = async (ctx, next) => {
  // ...
  await next();
};

export default {
  account,
  phone,
  wechat,
};
