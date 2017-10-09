
import Express = require("express");
import { UserDataStore } from "./storage/UserDataStore";
import { Winston } from "../../types/Dependencies";

import FirstFactorGet = require("./routes/firstfactor/get");
import SecondFactorGet = require("./routes/secondfactor/get");

import FirstFactorPost = require("./routes/firstfactor/post");
import LogoutGet = require("./routes/logout/get");
import VerifyGet = require("./routes/verify/get");
import TOTPSignGet = require("./routes/secondfactor/totp/sign/post");

import IdentityCheckMiddleware = require("./IdentityCheckMiddleware");

import TOTPRegistrationIdentityHandler from "./routes/secondfactor/totp/identity/RegistrationHandler";
import U2FRegistrationIdentityHandler from "./routes/secondfactor/u2f/identity/RegistrationHandler";
import ResetPasswordIdentityHandler from "./routes/password-reset/identity/PasswordResetHandler";

import U2FSignPost = require("./routes/secondfactor/u2f/sign/post");
import U2FSignRequestGet = require("./routes/secondfactor/u2f/sign_request/get");

import U2FRegisterPost = require("./routes/secondfactor/u2f/register/post");
import U2FRegisterRequestGet = require("./routes/secondfactor/u2f/register_request/get");

import ResetPasswordFormPost = require("./routes/password-reset/form/post");
import ResetPasswordRequestPost = require("./routes/password-reset/request/get");

import Error401Get = require("./routes/error/401/get");
import Error403Get = require("./routes/error/403/get");
import Error404Get = require("./routes/error/404/get");

import LoggedIn = require("./routes/loggedin/get");

import { ServerVariablesHandler } from "./ServerVariablesHandler";

import Endpoints = require("../../../shared/api");

function withLog(fn: (req: Express.Request, res: Express.Response) => void) {
  return function(req: Express.Request, res: Express.Response) {
    const logger = ServerVariablesHandler.getLogger(req.app);
    logger.debug(req, "Headers = %s", JSON.stringify(req.headers));
    fn(req, res);
  };
}

export class RestApi {
  static setup(app: Express.Application): void {
    app.get(Endpoints.FIRST_FACTOR_GET, withLog(FirstFactorGet.default));
    app.get(Endpoints.SECOND_FACTOR_GET, withLog(SecondFactorGet.default));
    app.get(Endpoints.LOGOUT_GET, withLog(LogoutGet.default));

    IdentityCheckMiddleware.register(app, Endpoints.SECOND_FACTOR_TOTP_IDENTITY_START_GET,
      Endpoints.SECOND_FACTOR_TOTP_IDENTITY_FINISH_GET, new TOTPRegistrationIdentityHandler());

    IdentityCheckMiddleware.register(app, Endpoints.SECOND_FACTOR_U2F_IDENTITY_START_GET,
      Endpoints.SECOND_FACTOR_U2F_IDENTITY_FINISH_GET, new U2FRegistrationIdentityHandler());

    IdentityCheckMiddleware.register(app, Endpoints.RESET_PASSWORD_IDENTITY_START_GET,
      Endpoints.RESET_PASSWORD_IDENTITY_FINISH_GET, new ResetPasswordIdentityHandler());

    app.get(Endpoints.RESET_PASSWORD_REQUEST_GET, withLog(ResetPasswordRequestPost.default));
    app.post(Endpoints.RESET_PASSWORD_FORM_POST, withLog(ResetPasswordFormPost.default));

    app.get(Endpoints.VERIFY_GET, withLog(VerifyGet.default));
    app.post(Endpoints.FIRST_FACTOR_POST, withLog(FirstFactorPost.default));
    app.post(Endpoints.SECOND_FACTOR_TOTP_POST, withLog(TOTPSignGet.default));

    app.get(Endpoints.SECOND_FACTOR_U2F_SIGN_REQUEST_GET, withLog(U2FSignRequestGet.default));
    app.post(Endpoints.SECOND_FACTOR_U2F_SIGN_POST, withLog(U2FSignPost.default));

    app.get(Endpoints.SECOND_FACTOR_U2F_REGISTER_REQUEST_GET, withLog(U2FRegisterRequestGet.default));
    app.post(Endpoints.SECOND_FACTOR_U2F_REGISTER_POST, withLog(U2FRegisterPost.default));

    app.get(Endpoints.ERROR_401_GET, withLog(Error401Get.default));
    app.get(Endpoints.ERROR_403_GET, withLog(Error403Get.default));
    app.get(Endpoints.ERROR_404_GET, withLog(Error404Get.default));
    app.get(Endpoints.LOGGED_IN, withLog(LoggedIn.default));
  }
}
