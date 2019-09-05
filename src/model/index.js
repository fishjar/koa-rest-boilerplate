import User from "./User";
import Auth from "./Auth";
import Role from "./Role";

User.hasMany(Auth);
Auth.belongsTo(User);

export default {
  User,
  Auth,
  Role,
};
