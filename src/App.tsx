import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Dashboard from './controllers/Dashboard';
import UserContext from './controllers/context/UserContext';

const Router = () => (
  <UserContext>
    <BrowserRouter>
      <Switch>
        <Route exact path={'/'} component={Dashboard} />
        {/* <Route exact path={'/addShooters'} component={Dashboard} />
      <Route exact path={'/addTargets'} component={Dashboard} /> */}
        {/* <Route path={'/roles/:id'} component={Editor} /> */}
        <Redirect to={'/'} />
      </Switch>
    </BrowserRouter>
  </UserContext>
);

export default Router;

