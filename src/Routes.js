import React from "react";
import { Routes as Switch, Route as Routing } from "react-router-dom";
import Form from "./Form";
import Reuse from "./Reuse";

const Routes = () => {
  return (
    <>
      <Switch>
        <Routing exact path="/" element={<Reuse />} />
      </Switch>
    </>
  );
};

export default Routes;
