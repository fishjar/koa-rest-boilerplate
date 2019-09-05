import { fetchTest } from "../utils/api";
import logger from "../utils/logger";

/**
 * 测试
 * @param {*} ctx
 * @param {*} next
 */
const fetch = async (ctx, next) => {
  const res = await fetchTest();
  ctx.assert(res, 500, "未获取到数据");
  ctx.body = res;

  next();
};

export default {
  fetch,
};
