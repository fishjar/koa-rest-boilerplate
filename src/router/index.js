import Router from "koa-router";

import account from "../handler/account";
import foo from "../handler/foo";

const router = new Router();
router
  .post("/account/login", account.login)
  .get("/foos", foo.findAndCountAll)        // 获取多条
  .get("/foos/:id", foo.findById)           // 根据ID查找单条
  .post("/foos", foo.singleCreate)          // 创建单条
  .post("/foos/multiple", foo.bulkCreate)   // 创建多条
  .patch("/foos", foo.bulkUpdate)           // 更新多条
  .patch("/foos/:id", foo.updateById)       // 更新单条
  .delete("/foos", foo.bulkDestroy)         // 删除多条
  .delete("/foos/:id", foo.destroyById)     // 删除单条
  .get("/foo", foo.findOne)                 // 根据条件查找单条
  .post("/foo", foo.findOrCreate);          // 查找或创建

export default router;
