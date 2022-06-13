import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components


// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import ForgotPassword from "../views/auth/ForgotPassword";
import ResetPassword from "../views/auth/ResetPassword";
export default function Auth() {

  return (
    <>
      <main>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route path="/auth/forgot-password" exact component={ForgotPassword} />
              <Redirect from="/auth" to="/auth/login" />
          </Switch>
      </main>
    </>
  );
}
