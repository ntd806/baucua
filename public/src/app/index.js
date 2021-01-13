import React, { useEffect, useRef } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import HomePage from 'Containers/HomePage';
import LoginPage from 'Containers/LoginPage';
import RegisterPage from 'Containers/RegisterPage';
import Loading from 'Components/Loading';
import { validateLogin } from 'Src/utils/auth';
import { setup, resize } from 'Src/styles/background';
import styled from 'styled-components';

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
  const isLogin = validateLogin();
  const loading = useRef();

  useEffect(() => {
    if (!['/login', '/register', '/home'].includes(window.location.pathname)) {
      window.location.href = '/home';
    }
    setup();
    window.addEventListener('resize', resize);
  }, []);

  return (
    <Container className={'content--canvas'}>
      <Loading ref={loading} />
      <BrowserRouter>
        <Switch>
          <PrivateRoute path="/home" isLogin={isLogin}>
            <HomePage />
          </PrivateRoute>
          <Route
            exact
            path="/login"
            component={() => (isLogin ? <Redirect to="/home" /> : <LoginPage loading={loading} />)}
          />
          <Route
            exact
            path="/register"
            component={() =>
              isLogin ? <Redirect to="/home" /> : <RegisterPage loading={loading} />
            }
          />
        </Switch>
      </BrowserRouter>
    </Container>
  );
}

export default App;

const Container = styled.div`
  color: white !important;
`;
