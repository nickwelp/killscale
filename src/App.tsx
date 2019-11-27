import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './controllers/Dashboard';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/dashboard'} component={Dashboard} />
      {/* <Route exact path={'/addShooters'} component={Dashboard} />
      <Route exact path={'/addTargets'} component={Dashboard} /> */}
      {/* <Route path={'/roles/:id'} component={Editor} /> */}
      <Redirect to={'/dashboard'} />
    </Switch>
  </BrowserRouter>
);

export default Router;

