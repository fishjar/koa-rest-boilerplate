import User from "./User";
import Auth from "./Auth";
import Role from "./Role";

User.hasMany(Auth, { foreignKey: "userId", as: "auths" });
Auth.belongsTo(User, { foreignKey: "userId", as: "user" });

export default {
  User,
  Auth,
  Role,
};
