import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import ResRoutes from "../components/reservation/ResRoutes";
import TableRoutes from "../components/tables/TablesRoutes";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/reservations">
        <ResRoutes />
      </Route>
      <Route path="/tables">
        <TableRoutes />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
