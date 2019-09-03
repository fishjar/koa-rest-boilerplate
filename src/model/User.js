import Sequelize from "sequelize";
import sequelize from "../db";

export default sequelize.define(
  "User",
  {
    id: {
      field: "id",
      comment: "ID",
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      field: "name",
      comment: "姓名",
      type: Sequelize.STRING(32),
    },
    nickname: {
      field: "nickname",
      comment: "昵称",
      type: Sequelize.STRING(64),
    },
    gender: {
      field: "gender",
      comment: "性别",
      type: Sequelize.TINYINT,
      validate: {
        isIn: [[0, 1, 2]], // 保密|男|女
      },
    },
    avatar: {
      field: "avatar",
      comment: "头像",
      type: Sequelize.STRING(255),
    },
    mobile: {
      field: "mobile",
      comment: "手机",
      type: Sequelize.STRING(16),
    },
    email: {
      field: "email",
      comment: "邮箱",
      type: Sequelize.STRING(255),
      validate: {
        isEmail: true,
      },
    },
    homepage: {
      field: "homepage",
      comment: "个人主页",
      type: Sequelize.STRING(255),
      validate: {
        isUrl: true,
      },
    },
    birthday: {
      field: "birthday",
      comment: "生日",
      type: Sequelize.DATEONLY,
    },
    height: {
      field: "height",
      comment: "身高(cm)",
      type: Sequelize.FLOAT,
      validate: {
        min: 0,
        max: 300,
      },
    },
    intro: {
      field: "intro",
      comment: "简介",
      type: Sequelize.TEXT,
    },
    notice: {
      field: "notice",
      comment: "备注",
      type: Sequelize.TEXT,
    },
    address: {
      field: "address",
      comment: "地址",
      type: Sequelize.JSON, // {province,city}
    },
    score: {
      field: "score",
      comment: "积分",
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
  },
  {
    underscored: true, // 下划线字段
    paranoid: true, // 软删除
    freezeTableName: true, // 禁用修改表名
    tableName: "user", // 定义表的名称
  }
);
