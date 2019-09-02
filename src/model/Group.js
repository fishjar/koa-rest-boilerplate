import Sequelize from "sequelize";
import sequelize from "../db";
import AdminUser from "./AdminUser";

export default sequelize.define(
  "Group",
  {
    id: {
      field: "id",
      comment: "ID",
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    lead: {
      field: "lead",
      comment: "组长",
      type: Sequelize.JSON,
      references: {
        model: AdminUser,
        key: "id",
      },
    },
    leadId: {
      field: "lead_id",
      comment: "组长ID",
      type: Sequelize.UUID,
    },
    members: {
      field: "members",
      comment: "成员",
      type: Sequelize.JSON,
    },
  },
  {
    underscored: true, // 下划线字段
    paranoid: true, // 软删除
    freezeTableName: true, // 禁用修改表名
    tableName: "group", // 定义表的名称
  }
);
