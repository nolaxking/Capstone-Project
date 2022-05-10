import React from "react";
import { Switch, Route } from "react-router-dom";
import CreateResForm from "./CreateResForm";
import ResSeat from "./ResSeat";

function ResRoutes() {
  return (
    <>
      <Switch>
        <Route path="/reservations/new">
          <CreateResForm />
        </Route>
        <Route path='/reservations/:reservation_id/seat'>
          <ResSeat />
        </Route>
        <Route  path="/reservations/:reservation_id/edit">
          <CreateResForm type="Edit"/>
        </Route>
      </Switch>
    </>
  );
}

export default ResRoutes;
