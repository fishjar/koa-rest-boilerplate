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
    const { count, rows } = await model.Auth.findAndCountAll({
      where,
      offset: (page_num - 1) * page_size,
      limit: page_size,
      order,
      attributes: { exclude: ["authCode"] },
      include: [
        {
          model: model.User,
          as: "user",
          // include: [
          //   {
          //     model: model.Auth,
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
    const auth = await model.Auth.findByPk(ctx.params.id);
    ctx.assert(auth, 404, "记录不存在");
    const user = await model.User.findByPk(auth.userId);
    ctx.assert(user, 500, "外键记录不存在");
    ctx.body = { ...auth.get({ plain: true }), user };
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
    ctx.body = await model.Auth.create(ctx.request.body);
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
    ctx.body = await model.Auth.bulkCreate(ctx.request.body, {
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
    ctx.body = await model.Auth.update(ctx.request.body.fields, {
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
    const auth = await model.Auth.findByPk(ctx.params.id);
    ctx.assert(auth, 500, "记录不存在");
    ctx.body = await auth.update(ctx.request.body);
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
    ctx.body = await model.Auth.destroy({
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
    const auth = await model.Auth.findByPk(ctx.params.id);
    ctx.assert(auth, 500, "记录不存在");
    ctx.body = await auth.destroy();
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
    const auth = await model.Auth.findOne({ where: ctx.query });
    ctx.assert(auth, 404, "记录不存在");
    const user = await model.User.findByPk(auth.userId);
    ctx.assert(user, 500, "外键记录不存在");
    ctx.body = { ...auth.get({ plain: true }), user };
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
    const [auth, created] = await model.Auth.findOrCreate({
      where: ctx.request.body,
    });
    ctx.body = {
      // ...auth.toJSON(),
      ...auth.get({ plain: true }),
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
