import Sequelize, { Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        username: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    User.tableName = "tb_user";

    // Executa antes de salvar usuário
    this.addHook("beforeSave", async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }

      return this;
    });
    return this;
  }
  checkPassworod(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
