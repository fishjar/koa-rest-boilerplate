import model from "../model";
import sequelize from "../db";
import { formatMenus } from "../utils";

/**
 * 查询多条信息
 */
const findAndCountAll = async (ctx, next) => {
  const { pageNum = 1, pageSize = 10, sorter, ...where } = ctx.query;
  let order = [];
  if (Array.isArray(sorter)) {
    order = [...sorter.map(item => item.split("__"))];
  } else if (sorter) {
    order = [sorter.split("__")];
  }
  const { count, rows } = await model.Role.findAndCountAll({
    where,
    offset: (pageNum - 1) * pageSize,
    limit: pageSize > 0 ? pageSize : null,
    order,
    include: [
      {
        model: model.User,
        as: "users",
      },
      {
        model: model.Menu,
        as: "menus",
      },
    ],
    distinct: true,
  });
  ctx.body = { count, rows };

  await next();
};

/**
 * 根据主键查询单条信息
 */
const findByPk = async (ctx, next) => {
  const role = await model.Role.findByPk(ctx.params.id);
  ctx.assert(role, 404, "记录不存在");

  ctx.body = role;

  await next();
};

/**
 * 创建单条信息
 */
const singleCreate = async (ctx, next) => {
  ctx.body = await model.Role.create(ctx.request.body);

  await next();
};

/**
 * 创建多条信息
 */
const bulkCreate = async (ctx, next) => {
  ctx.body = await model.Role.bulkCreate(ctx.request.body, {
    validate: true,
  });

  await next();
};

/**
 * 更新多条信息
 */
const bulkUpdate = async (ctx, next) => {
  const { id } = ctx.query;
  ctx.assert(id, 400, "参数有误");
  ctx.body = await model.Role.update(ctx.request.body, { where: { id } });

  await next();
};

/**
 * 更新单条信息
 */
const updateByPk = async (ctx, next) => {
  const role = await model.Role.findByPk(ctx.params.id);
  ctx.assert(role, 404, "记录不存在");
  const { menus, ...fields } = ctx.request.body;

  // // 创建事务
  // const t = await sequelize.transaction();
  // // 设置据色菜单
  // const menus = [];
  // for (let i = 0; i < menus.length; i++) {
  //   menus.push(await model.Menu.findByPk(menus[i]));
  // }
  // await role.setMenus(menus, { transaction: t });
  // // 更新角色资料
  // ctx.body = await role.update(fields, { transaction: t });

  // 设置菜单
  if (menus) {
    await role.setMenus(
      await Promise.all(menus.map(id => model.Menu.findByPk(id)))
    );
  }

  // 更新资料
  ctx.body = await role.update(fields);

  await next();
};

/**
 * 删除多条信息
 */
const bulkDestroy = async (ctx, next) => {
  const { id } = ctx.query;
  ctx.assert(id, 400, "参数有误");
  ctx.body = await model.Role.destroy({ where: { id } });

  await next();
};

/**
 * 删除单条信息
 */
const destroyByPk = async (ctx, next) => {
  const role = await model.Role.findByPk(ctx.params.id);
  ctx.assert(role, 404, "记录不存在");
  ctx.body = await role.destroy();

  await next();
};

/**
 * 查询单条信息
 */
const findOne = async (ctx, next) => {
  const role = await model.Role.findOne({ where: ctx.query });
  ctx.assert(role, 404, "记录不存在");
  ctx.body = role;

  await next();
};

/**
 * 查询或创建单条信息
 */
const findOrCreate = async (ctx, next) => {
  const [role, created] = await model.Role.findOrCreate({
    where: ctx.request.body,
  });
  ctx.body = {
    // ...role.toJSON(),
    ...role.get({ plain: true }),
    created,
  };

  await next();
};

/**
 * 角色菜单
 */
const findRoleMenus = async (ctx, next) => {
  const role = await model.Role.findByPk(ctx.params.id);
  ctx.assert(role, 404, "角色不存在");
  // const menus = await role.getMenus();
  const menus = await model.Menu.findAll({
    include: [
      {
        model: model.Role,
        as: "roles",
      },
    ],
  });
  const { format } = ctx.query;
  if (format) {
    ctx.body = formatMenus(menus, null, ctx.params.id);
  } else {
    ctx.body = menus;
  }

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
  findRoleMenus,
};
