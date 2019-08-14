import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Profile from "./containers/Profile";
import PresciptionsList from "./containers/PrescriptionsList";
import HomepageLayout from "./containers/Home";

const BaseRouter = () => (
  <Hoc>
    <Route exact path="/login" component={Login} />
    <Route exact path="/signup" component={Signup} />
    <Route exact path="/profile/:id" component={Profile} />
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/prescriptions" component={PresciptionsList} />

  </Hoc>
);

export default BaseRouter;
