import model from "../model";
import logger from "../utils/logger";

/**
 * 查询多条信息
 */
const findAndCountAll = async (ctx, next) => {
  try {
    const { page_num = 1, page_size = 10, sorter, ...where } = ctx.query;
    let order = [];
    if (Array.isArray(sorter)) {
      order = [...sorter.map(item => item.split("__"))];
    } else if (sorter) {
      order = [sorter.split("__")];
    }
    const { count, rows } = await model.User.findAndCountAll({
      where,
      offset: (page_num - 1) * page_size,
      limit: page_size,
      order,
      include: [
        {
          model: model.Auth,
          as: "auths",
          // include: [
          //   {
          //     model: model.User,
          //   },
          // ],
        },
      ],
    });
    ctx.body = { count, rows };
  } catch (err) {
    logger.error(
      `[查询失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
  }
  next();
};

/**
 * 根据主键查询单条信息
 */
const findByPk = async (ctx, next) => {
  try {
    const user = await model.User.findByPk(ctx.params.id);
    ctx.assert(user, 404, "记录不存在");
    ctx.body = user;
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

/**
 * 创建单条信息
 */
const singleCreate = async (ctx, next) => {
  try {
    ctx.body = await model.User.create(ctx.request.body);
  } catch (err) {
    logger.error(
      `[创建失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "创建失败");
  }
  next();
};

/**
 * 创建多条信息
 */
const bulkCreate = async (ctx, next) => {
  try {
    ctx.body = await model.User.bulkCreate(ctx.request.body, {
      validate: true,
    });
  } catch (err) {
    logger.error(
      `[创建失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "创建失败");
  }
  next();
};

/**
 * 更新多条信息
 */
const bulkUpdate = async (ctx, next) => {
  try {
    ctx.body = await model.User.update(ctx.request.body.fields, {
      where: ctx.request.body.filter,
    });
  } catch (err) {
    logger.error(
      `[更新失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "更新失败");
  }
  next();
};

/**
 * 更新单条信息
 */
const updateByPk = async (ctx, next) => {
  try {
    const user = await model.User.findByPk(ctx.params.id);
    ctx.assert(user, 500, "记录不存在");
    ctx.body = await user.update(ctx.request.body);
  } catch (err) {
    logger.error(
      `[更新失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "更新失败");
  }
  next();
};

/**
 * 删除多条信息
 */
const bulkDestroy = async (ctx, next) => {
  try {
    ctx.body = await model.User.destroy({
      where: ctx.request.body,
    });
  } catch (err) {
    logger.error(
      `[删除失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "删除失败");
  }
  next();
};

/**
 * 删除单条信息
 */
const destroyByPk = async (ctx, next) => {
  try {
    const user = await model.User.findByPk(ctx.params.id);
    ctx.assert(user, 500, "记录不存在");
    ctx.body = await user.destroy();
  } catch (err) {
    logger.error(
      `[删除失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "删除失败");
  }
  next();
};

/**
 * 查询单条信息
 */
const findOne = async (ctx, next) => {
  try {
    const user = await model.User.findOne({ where: ctx.query });
    ctx.assert(user, 404, "记录不存在");
    ctx.body = user;
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

/**
 * 查询或创建单条信息
 */
const findOrCreate = async (ctx, next) => {
  try {
    const [user, created] = await model.User.findOrCreate({
      where: ctx.request.body,
    });
    ctx.body = {
      // ...user.toJSON(),
      ...user.get({ plain: true }),
      created,
    };
  } catch (err) {
    logger.error(
      `[查询或创建失败] ${JSON.stringify({
        auth: ctx.state.auth,
        err,
      })}`
    );
    ctx.throw(500, "查询或创建失败");
  }

  next();
};

export default {
  findAndCountAll,
  findByPk,
  singleCreate,
  bulkCreate,
  bulkUpdate,
  updateByPk,
  bulkDestroy,
  destroyByPk,
  findOne,
  findOrCreate,
};
