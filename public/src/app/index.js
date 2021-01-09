import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import HomePage from 'Containers/HomePage';
import LoginPage from 'Containers/LoginPage';
import RegisterPage from 'Containers/RegisterPage';

function PrivateRoute({ children, isLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLogin ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

function App() {
  const isLogin = Boolean(Cookies.get('token'));
  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute path="/home" isLogin={isLogin}>
          <HomePage />
        </PrivateRoute>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
