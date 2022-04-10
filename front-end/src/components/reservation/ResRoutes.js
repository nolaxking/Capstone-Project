import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateResForm from "./CreateResForm";

function ResRoutes() {
  return (
    <>
      <Switch>
        <Route path="/reservations/new">
          <CreateResForm />
        </Route>
      </Switch>
    </>
  );
}

export default ResRoutes;
