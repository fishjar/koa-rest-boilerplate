import model from "../model";

/**
 * 查询多条信息
 */
const findAndCountAll = async (ctx, next) => {
  // model.Auth.belongsTo(model.User);

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
    include: [
      {
        model: model.User,
        include: [
          {
            model: model.Auth,
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
  ctx.body = await model.Auth.findByPk(ctx.params.id);
  await next();
};

/**
 * 创建单条信息
 */
const singleCreate = async (ctx, next) => {
  ctx.body = await model.Auth.create(ctx.request.body);
  await next();
};

/**
 * 创建多条信息
 */
const bulkCreate = async (ctx, next) => {
  ctx.body = await model.Auth.bulkCreate(ctx.request.body);
  await next();
};

/**
 * 更新多条信息
 */
const bulkUpdate = async (ctx, next) => {
  ctx.body = await model.Auth.update(ctx.request.body.fields, {
    where: ctx.request.body.filter,
  });
  await next();
};

/**
 * 更新单条信息
 */
const updateByPk = async (ctx, next) => {
  const obj = await model.Auth.findByPk(ctx.params.id);
  ctx.body = await obj.update(ctx.request.body);
  await next();
};

/**
 * 删除多条信息
 */
const bulkDestroy = async (ctx, next) => {
  ctx.body = await model.Auth.destroy({
    where: ctx.request.body,
  });
  await next();
};

/**
 * 删除单条信息
 */
const destroyByPk = async (ctx, next) => {
  const obj = await model.Auth.findByPk(ctx.params.id);
  ctx.body = await obj.destroy();
  await next();
};

/**
 * 查询单条信息
 */
const findOne = async (ctx, next) => {
  ctx.body = await model.Auth.findOne({ where: ctx.query });
  await next();
};

/**
 * 查询或创建单条信息
 */
const findOrCreate = async (ctx, next) => {
  const [obj, created] = await model.Auth.findOrCreate({
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
