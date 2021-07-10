import React from "react";
import { Switch, Route, Router } from "react-router-dom";

import Home from "./home";

const Main = () => (
  <Router basename="/pipeline">
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </Router>
);

export default Main;
