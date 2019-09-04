import User from "./User";
import Auth from "./Auth";

User.hasMany(Auth);
Auth.belongsTo(User);

export default {
  User,
  Auth,
};
