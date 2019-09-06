import Sequelize from "sequelize";
import sequelize from "../db";

const UserGroup = sequelize.define(
  "usergroup",
  {
    id: {
      field: "id",
      comment: "ID",
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    level: {
      field: "level",
      comment: "级别",
      type: Sequelize.TINYINT,
      defaultValue: 0,
      validate: {
        isInt: true,
      },
    },
    joinTime: {
      field: "join_time",
      comment: "加入时间",
      type: Sequelize.DATE,
      validate: {
        isDate: true,
      },
    },
  },
  {
    underscored: true, // 使用下划线字段
    paranoid: true, // 软删除
    freezeTableName: true, // 禁用表名自动复数
    tableName: "usergroup", // 定义表的名称
  }
);

export default UserGroup;
