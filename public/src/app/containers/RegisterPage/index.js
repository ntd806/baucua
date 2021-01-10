/*global FB*/
import React, { memo, useCallback, useState, useEffect } from 'react';
import { Steps, Space, Button, Avatar, Input } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';

import {
  Container,
  FormContainer,
  StyledButton,
  ButtonGroup,
  ActionContainer,
  InfoGroup,
  Login,
  ActionButtonGroup,
} from './styled';
import { register } from 'Src/services/register';
import AvatarImage from 'Src/images/avatar.png';

const { Step } = Steps;

export default memo(function RegisterPage({ loading }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState({
    fb_UID: undefined,
    gg_Mail: undefined,
    name: undefined,
    address: undefined,
    phone: undefined,
  });

  const onClick = useCallback(
    ({ currentTarget: { title } }) => {
      switch (title) {
        case 'Trước':
          setCurrentStep(0);
          break;
        case 'Tiếp':
          setCurrentStep(1);
          break;
        case 'Đăng ký':
          loading.current.add('register');
          register(state)
            .then((res) => {
              console.log(res);
            })
            .finally(() => loading.current.remove('register'));
          break;
        default:
          break;
      }
    },
    [setCurrentStep, state, loading],
  );

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

  const onLoginFacebook = useCallback(() => {
    FB.login(
      (response) => {
        setState((e) => ({
          ...e,
          fb_UID: _.get(response, 'authResponse.userID', undefined),
        }));
      },
      {
        scope: 'email',
        return_scopes: true,
      },
    );
  }, [setState]);

  const onLoginGoogle = useCallback(
    (response) => {
      setState((e) => ({
        ...e,
        gg_Mail: _.get(response, 'profileObj.email', undefined),
        name: _.get(response, 'profileObj.name', undefined),
      }));
    },
    [setState],
  );

  const onInputChange = useCallback(
    ({ currentTarget: { title }, target: { value } }) => {
      setState((e) => ({
        ...e,
        [title]: value,
      }));
    },
    [setState],
  );

  useEffect(() => {
    const refLoading = loading.current;
    return () => {
      return refLoading.removeAll();
    };
    // eslint-disable-next-line
  }, [loading.current]);

  return (
    <Container>
      <FormContainer>
        <Steps type="navigation" size="small" current={currentStep}>
          <Step
            title="Bước 1"
            status={!(state.fb_UID && state.gg_Mail) ? 'finish' : 'process'}
            description="Liên kết tài khoản."
          />
          <Step
            title="Bước 2"
            status={!(state.name && state.address && state.phone) ? 'finish' : 'process'}
            description="Thông tin cá nhân."
          />
        </Steps>
        {currentStep ? (
          <InfoGroup size={'middle'} direction={'vertical'}>
            <Avatar size={100} src={AvatarImage} />
            <Input
              onChange={onInputChange}
              title={'name'}
              value={state.name}
              placeholder={'Họ và tên'}
            />
            <Input
              onChange={onInputChange}
              title={'address'}
              value={state.address}
              placeholder={'Địa chỉ'}
            />
            <Input
              onChange={onInputChange}
              title={'phone'}
              value={state.phone}
              placeholder={'Số điện thoại'}
            />
          </InfoGroup>
        ) : (
          <ButtonGroup>
            <Space direction={'vertical'} size={'middle'}>
              <StyledButton
                disabled={state.fb_UID}
                onClick={onLoginFacebook}
                icon={<FacebookOutlined />}
                type={'facebook'}
              >
                {'Liên kết với Facebook'}
              </StyledButton>
              <GoogleLogin
                clientId={process.env.GG_ID}
                render={(renderProps) => (
                  <StyledButton
                    disabled={state.gg_Mail}
                    onClick={renderProps.onClick}
                    icon={<GoogleOutlined />}
                    type={'google'}
                  >
                    {'Liên kết với Google'}
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
          <Login>
            {'Đã có tài khoản?'} <Link to="/login">{'Đăng nhập'}</Link>
          </Login>
          <ActionButtonGroup>
            {currentStep ? (
              <Button title={'Trước'} onClick={onClick}>
                {'Trước'}
              </Button>
            ) : (
              <div />
            )}
            <Button
              title={currentStep ? 'Đăng ký' : 'Tiếp'}
              disabled={
                !(currentStep
                  ? state.name && state.address && state.phone
                  : state.fb_UID && state.gg_Mail)
              }
              onClick={onClick}
            >
              {currentStep ? 'Đăng ký' : 'Tiếp'}
            </Button>
          </ActionButtonGroup>
        </ActionContainer>
      </FormContainer>
    </Container>
  );
});
