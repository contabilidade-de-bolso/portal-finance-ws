import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      username: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6)
    });

    if (!(await schema.isValid(req.body)))
      return res
        .status(400)
        .json({ success: false, errormessage: "Validation fails" });

    const userExist = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (userExist)
      return res.status(400).json({
        success: false,
        errormessage: `E-mail ${req.body.email} já existe.`
      });

    const { id_user, name, username, email } = await User.create(req.body);
    return res.json({
      result: { id_user, name, username, email },
      success: true
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      is_provider: Yup.string().boolean(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when("oldPassword", (oldPassword, field) =>
          oldPassword ? field.required() : field
        ),
      confirmPassword: Yup.string().when("password", (password, field) =>
        password ? field.required().oneOf([Yup.ref("password")]) : field
      )
    });

    if (!(await schema.isValid(req.body)))
      return res
        .status(400)
        .json({ success: false, error: "Validation fails" });

    const { email, oldPassword } = req.body;

    const user = await User.findByPk(req.userId);

    if (email != user.email) {
      const userExist = await User.findOne({ where: { email } });

      if (userExist)
        return res
          .status(400)
          .json({ success: false, error: "User already exists." });
    }

    if (oldPassword && !(await user.checkPassworod(oldPassword)))
      return res
        .status(401)
        .json({ success: false, error: "Password does not match" });

    const { id, name } = await user.update(req.body);
    return res.json({
      result: { id, name, email },
      success: true
    });
  }
}

export default new UserController();
