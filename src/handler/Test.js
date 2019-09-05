import { fetchTest } from "../utils/api";
import logger from "../utils/logger";

/**
 * 测试
 * @param {*} ctx
 * @param {*} next
 */
const fetch = async (ctx, next) => {
  try {
    const res = await fetchTest();
    ctx.assert(res, 500, "未获取到数据");
    ctx.body = res;
  } catch (err) {
    logger.error(
      `[查询失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "查询失败");
  }
  next();
};

export default {
  fetch,
};
