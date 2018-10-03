import React from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import App from './App';
import Admin from './admin/Admin';

const RouteApp = () => {
  return (
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/admin' component={Admin} />
    </Switch>
  )
}
export default RouteApp
