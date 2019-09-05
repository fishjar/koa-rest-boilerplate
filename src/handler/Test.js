import { fetchTest } from "../utils/api";

/**
 * 帐号密码登录
 * @param {*} ctx
 * @param {*} next
 */
const fetch = async (ctx, next) => {
  const res = await fetchTest();
  if (!res) {
    ctx.throw(500, "未获取数据");
  }
  ctx.body = res;

  next();
};

export default {
  fetch,
};
