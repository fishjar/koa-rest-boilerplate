import Router from "koa-router";
import handler from "../handler";

const router = new Router();
const userAuth = (roles) => (ctx, next) => {
  next();
}
router
  .get("/test/fetch", handler.Test.fetch)
  .post("/test/create", handler.Test.createAuth)

  .get("/user", handler.User.findOne)                 // 根据条件查找单条
  .post("/user", handler.User.findOrCreate)           // 查找或创建单条
  .get("/users", handler.User.findAndCountAll)        // 获取多条
  .post("/users", handler.User.singleCreate)          // 创建单条
  .patch("/users", handler.User.bulkUpdate)           // 更新多条
  .delete("/users", handler.User.bulkDestroy)         // 删除多条
  .get("/users/:id", handler.User.findByPk)           // 根据主键查找单条
  .patch("/users/:id", handler.User.updateByPk)       // 更新单条
  .delete("/users/:id", handler.User.destroyByPk)     // 删除单条
  .post("/users/multiple", handler.User.bulkCreate)   // 创建多条

  .get("/auth", handler.Auth.findOne)                 // 根据条件查找单条
  .post("/auth", handler.Auth.findOrCreate)           // 查找或创建单条
  .get("/auths", handler.Auth.findAndCountAll)        // 获取多条
  .post("/auths", handler.Auth.singleCreate)          // 创建单条
  .patch("/auths", handler.Auth.bulkUpdate)           // 更新多条
  .delete("/auths", handler.Auth.bulkDestroy)         // 删除多条
  .get("/auths/:id", handler.Auth.findByPk)           // 根据主键查找单条
  .patch("/auths/:id", handler.Auth.updateByPk)       // 更新单条
  .delete("/auths/:id", handler.Auth.destroyByPk)     // 删除单条
  .post("/auths/multiple", handler.Auth.bulkCreate)   // 创建多条

  .get("/role", handler.Role.findOne)                 // 根据条件查找单条
  .post("/role", handler.Role.findOrCreate)           // 查找或创建单条
  .get("/roles", handler.Role.findAndCountAll)        // 获取多条
  .post("/roles", handler.Role.singleCreate)          // 创建单条
  .patch("/roles", handler.Role.bulkUpdate)           // 更新多条
  .delete("/roles", handler.Role.bulkDestroy)         // 删除多条
  .get("/roles/:id", handler.Role.findByPk)           // 根据主键查找单条
  .patch("/roles/:id", handler.Role.updateByPk)       // 更新单条
  .delete("/roles/:id", handler.Role.destroyByPk)     // 删除单条
  .post("/roles/multiple", handler.Role.bulkCreate)   // 创建多条

  .get("/group", handler.Group.findOne)                 // 根据条件查找单条
  .post("/group", handler.Group.findOrCreate)           // 查找或创建单条
  .get("/groups", handler.Group.findAndCountAll)        // 获取多条
  .post("/groups", handler.Group.singleCreate)          // 创建单条
  .patch("/groups", handler.Group.bulkUpdate)           // 更新多条
  .delete("/groups", handler.Group.bulkDestroy)         // 删除多条
  .get("/groups/:id", handler.Group.findByPk)           // 根据主键查找单条
  .patch("/groups/:id", handler.Group.updateByPk)       // 更新单条
  .delete("/groups/:id", handler.Group.destroyByPk)     // 删除单条
  .post("/groups/multiple", handler.Group.bulkCreate)   // 创建多条

  .post("/login/account", handler.Login.account)      // 帐号密码登录
  .post("/login/phone", handler.Login.phone)          // 手机登录
  .post("/login/wechat", handler.Login.wechat);       // 微信登录

export default router;
