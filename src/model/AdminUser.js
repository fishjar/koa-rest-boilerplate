import Sequelize from "sequelize";
import sequelize from "../db";

export default sequelize.define(
  "AdminUser",
  {
    id: {
      field: "id",
      comment: "ID",
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userName: {
      field: "user_name",
      comment: "用户名",
      type: Sequelize.STRING(32),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 32],
      },
    },
    userType: {
      field: "user_type",
      comment: "用户类型",
      type: Sequelize.STRING(32),
      allowNull: false,
    },
    password: {
      field: "password",
      comment: "密码",
      type: Sequelize.STRING(64),
      allowNull: false,
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
        isIn: [[0, 1, 2]],
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
        isUrl: true
      }
    },
    birthday: {
      field: "birthday",
      comment: "生日",
      type: Sequelize.DATEONLY,
    },
    verifyTime: {
      field: "verify_time",
      comment: "认证时间",
      type: Sequelize.DATE,
    },
    height: {
      field: "height",
      comment: "身高",
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
    address: {
      field: "address",
      comment: "地址",
      type: Sequelize.JSON, // {province,city}
    },
    isMarried: {
      field: "is_married",
      comment: "是否结婚",
      type: Sequelize.BOOLEAN,
    },
    score: {
      field: "score",
      comment: "积分",
      type: Sequelize.INTEGER,
    },
  },
  {
    underscored: true, // 下划线字段
    paranoid: true, // 软删除
    freezeTableName: true, // 禁用修改表名
    tableName: "admin_user", // 定义表的名称
  }
);
