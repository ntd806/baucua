import React, { useEffect, useRef } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import AdminPage from 'Containers/AdminPage';
import LoginPage from 'Containers/LoginPage';
import RegisterPage from 'Containers/RegisterPage';
import ProfilePage from 'Containers/ProfilePage';
import HomePage from 'Containers/HomePage';
import Loading from 'Components/Loading';
import { validateLogin } from 'Src/utils/auth';
import { setup as setupCoalesce, resize as resizeCoalesce } from 'Src/styles/background/coalesce';
import { setup as setupPipeline, resize as resizePipeline } from 'Src/styles/background/pipeline';
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
    if (
      !['/login', '/register', '/admin', '/profile', '/home'].includes(window.location.pathname)
    ) {
      window.location.href = '/profile';
    }
    let setup = () => {};
    let resize = () => {};
    if (['/login', '/register'].includes(window.location.pathname)) {
      setup = setupCoalesce;
      resize = resizeCoalesce;
    }
    if (['/profile'].includes(window.location.pathname)) {
      setup = setupPipeline;
      resize = resizePipeline;
    }
    setup();
    window.addEventListener('resize', resize);
  }, []);

  return (
    <Container className={'content--canvas'}>
      <Loading ref={loading} />
      <BrowserRouter>
        <Route path="/home">
          <HomePage loading={loading} />
        </Route>
        <Switch>
          <PrivateRoute path="/admin" isLogin={isLogin}>
            <AdminPage loading={loading} />
          </PrivateRoute>
          <PrivateRoute path="/profile" isLogin={isLogin}>
            <ProfilePage loading={loading} />
          </PrivateRoute>
          <Route
            exact
            path="/login"
            component={() => (isLogin ? <Redirect to="/admin" /> : <LoginPage loading={loading} />)}
          />
          <Route
            exact
            path="/register"
            component={() =>
              isLogin ? <Redirect to="/admin" /> : <RegisterPage loading={loading} />
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
