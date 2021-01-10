/*global FB*/
import React, { memo, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Space, Input, Button } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import GoogleLogin from 'react-google-login';
import _ from 'lodash';

import {
  Container,
  FormContainer,
  StyledButton,
  ButtonGroup,
  ActionContainer,
  Register,
  StyledRedirect,
  InfoGroup,
  Title,
} from './styled';
import { login } from 'Src/services/login';

export default memo(function LoginPage({ loading }) {
  const [state, setState] = useState({
    fb_UID: undefined,
    gg_mail: undefined,
    username: '',
    password: '',
    is_admin: false,
  });

  useEffect(() => {
    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');

    window.fbAsyncInit = () => {
      FB.init({
        appId: process.env.FB_ID,
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v9.0',
      });
    };
  }, []);

  const onRoleChange = useCallback(() => {
    setState((e) => ({
      ...e,
      is_admin: !e.is_admin,
    }));
  }, [setState]);

  const onInputChange = useCallback(({ currentTarget: { title }, target: { value } }) => {
    setState((e) => ({
      ...e,
      [title]: value,
    }));
  }, []);

  const onLogin = useCallback(
    (key, data) => {
      let params = { ...state };
      if (!state.is_admin) {
        params[key] = data;
        setState(params);
      }
      loading.current.add('login');
      login(params)
        .then((res) => {
          console.log(res);
        })
        .finally(() => loading.current.remove('login'));
    },
    [state, loading],
  );

  const onLoginFacebook = useCallback(() => {
    FB.login(
      (response) => {
        const fb_UID = _.get(response, 'authResponse.userID', undefined);
        if (fb_UID) onLogin('fb_UID', fb_UID);
      },
      {
        scope: 'email',
        return_scopes: true,
      },
    );
  }, [onLogin]);

  const onLoginGoogle = useCallback(
    (response) => {
      const gg_Mail = _.get(response, 'profileObj.email', undefined);
      if (gg_Mail) onLogin('gg_Mail', gg_Mail);
    },
    [onLogin],
  );

  return (
    <Container>
      <FormContainer>
        {state.is_admin ? (
          <InfoGroup size={'middle'} direction={'vertical'}>
            <Title>{'Đăng nhập'}</Title>
            <Input
              onChange={onInputChange}
              title={'username'}
              value={state.username}
              placeholder={'Tên đăng nhập'}
            />
            <Input
              onChange={onInputChange}
              title={'password'}
              value={state.password}
              placeholder={'Mật khẩu'}
            />
            <Button disabled={!(state.username && state.password)} onClick={onLogin}>
              {'Đăng nhập'}
            </Button>
          </InfoGroup>
        ) : (
          <ButtonGroup>
            <Space direction={'vertical'} size={'large'}>
              <StyledButton onClick={onLoginFacebook} icon={<FacebookOutlined />} type={'facebook'}>
                {'Đăng nhập bằng Facebook'}
              </StyledButton>
              <GoogleLogin
                clientId={process.env.GG_ID}
                render={(renderProps) => (
                  <StyledButton
                    onClick={renderProps.onClick}
                    icon={<GoogleOutlined />}
                    type={'google'}
                  >
                    {'Đăng nhập bằng Google'}
                  </StyledButton>
                )}
                buttonText="Login"
                onSuccess={onLoginGoogle}
                onFailure={onLoginGoogle}
                cookiePolicy={'single_host_origin'}
              />
            </Space>
          </ButtonGroup>
        )}
        <ActionContainer direction={'vertical'} size={'large'}>
          <Register>
            {'Không có tài khoản?'} <Link to="/register">{'Đăng ký'}</Link>
          </Register>
          <StyledRedirect onClick={onRoleChange}>{`Bạn là ${
            state.is_admin ? 'người chơi' : 'Admin'
          }?`}</StyledRedirect>
        </ActionContainer>
      </FormContainer>
    </Container>
  );
});
