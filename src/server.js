import app from "./app";
import sequelize from "./db";
import model from "./model";
import config from "./config";
import sign from "./utils/sign";

const { NODE_PORT, DEFAULT_USERNAME, DEFAULT_PASSWORD } = config;

sequelize
  .authenticate() // 测试数据库连接
  .then(() => {
    console.log("连接数据库成功");
    // return sequelize.sync();
    return sequelize.sync({ force: true }); // 带上{force: true}参数会强制删除已存在的表
  })
  .then(() => {
    // 创建默认用户
    return model.User.findOrCreate({
      where: {
        name: DEFAULT_USERNAME,
      },
    });
  })
  .then(([user, _]) => {
    // 创建默认鉴权
    const authCode = sign.signPwd(DEFAULT_USERNAME, DEFAULT_PASSWORD);
    return model.Auth.findOrCreate({
      where: {
        userId: user.id,
        authType: "account",
        authName: DEFAULT_USERNAME,
        authCode,
        verifyTime: new Date(),
        expireTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      },
    });
  })
  .then(() => {
    // 启动服务
    app.listen(NODE_PORT);
    console.log(`\n>>> app run at port: ${NODE_PORT} <<<\n`);
  })
  .catch(err => {
    console.log("程序启动出错");
    console.log(err);
  });
