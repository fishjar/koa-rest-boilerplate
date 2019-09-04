import model from "../model";

/**
 * 查询多条信息
 */
const findAndCountAll = async (ctx, next) => {
  // model.User.hasMany(model.Auth);

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
        include: [
          {
            model: model.User,
          },
        ],
      },
    ],
  });
  ctx.body = { count, rows };
  await next();
};

/**
 * 根据主键查询单条信息
 */
const findByPk = async (ctx, next) => {
  const obj = await model.User.findByPk(ctx.params.id);
  if (!obj) {
    ctx.throw(404, "记录不存在");
  }
  ctx.body = obj;
  await next();
};

/**
 * 创建单条信息
 */
const singleCreate = async (ctx, next) => {
  ctx.body = await model.User.create(ctx.request.body);
  await next();
};

/**
 * 创建多条信息
 */
const bulkCreate = async (ctx, next) => {
  ctx.body = await model.User.bulkCreate(ctx.request.body);
  await next();
};

/**
 * 更新多条信息
 */
const bulkUpdate = async (ctx, next) => {
  ctx.body = await model.User.update(ctx.request.body.fields, {
    where: ctx.request.body.filter,
  });
  await next();
};

/**
 * 更新单条信息
 */
const updateByPk = async (ctx, next) => {
  const obj = await model.User.findByPk(ctx.params.id);
  ctx.body = await obj.update(ctx.request.body);
  await next();
};

/**
 * 删除多条信息
 */
const bulkDestroy = async (ctx, next) => {
  ctx.body = await model.User.destroy({
    where: ctx.request.body,
  });
  await next();
};

/**
 * 删除单条信息
 */
const destroyByPk = async (ctx, next) => {
  const obj = await model.User.findByPk(ctx.params.id);
  ctx.body = await obj.destroy();
  await next();
};

/**
 * 查询单条信息
 */
const findOne = async (ctx, next) => {
  ctx.body = await model.User.findOne({ where: ctx.query });
  await next();
};

/**
 * 查询或创建单条信息
 */
const findOrCreate = async (ctx, next) => {
  const [obj, created] = await model.User.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...obj.toJSON(),
    ...obj.get({ plain: true }),
    created,
  };
  await next();
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
