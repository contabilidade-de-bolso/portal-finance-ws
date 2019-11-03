import * as Yup from "yup";
import jwt from "jsonwebtoken";
import User from "../models/User";
import authConf from "../../config/auth";

let message = "Token inválido.";
let errocode = "TOKEN_INVALID";

class SessionController {
  async checkSession(req, res) {
    const authHeader = req.headers.authorization;
    const [, token] = authHeader.split(" ");

    await jwt.verify(token, authConf.secret, (err, decoded) => {
      if (err) {
        if (err.name && err.name == "TokenExpiredError") {
          message =
            "Sua sessão expirou, por gentiliza insira seus dados novamente.";
          errocode = "SESSION_EXPIRE";
        }
        res.json({
          success: false,
          message,
          errocode
        });
      }

      res.json({
        success: true
      });
    });
  }

  async authenticate(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(req.body)))
      return res.status(400).json({
        success: false,
        message: "Usuário e senha são obrigatorios.",
        errocode: "FIELDS_REQUIRED"
      });

    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } }).catch(error =>
      console.log("error")
    );

    console.log(">>>> ", user);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Cliente não encontrado.",
        errocode: "USER_NOT_FOUND"
      });
    }

    if (!(await user.checkPassworod(password))) {
      return res.status(401).json({
        success: false,
        message: "Usuário ou senha não invalida.",
        errocode: "PASSWORD_NOT_VALID"
      });
    }

    const { id, name, email } = user;

    return res.json({
      success: true,
      result: {
        user: { id, name, email, username },
        token: jwt.sign({ id }, authConf.secret, {
          expiresIn: authConf.expiresIn
        })
      }
    });
  }
}

export default new SessionController();
