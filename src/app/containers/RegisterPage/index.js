/*global FB*/
import React, { memo, useCallback, useState, useEffect } from 'react';
import { Steps, Space, Button, Avatar, Input } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import _ from 'lodash';
import GoogleLogin from 'react-google-login';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
import { handleResponse } from 'Src/utils/handleError';

const { Step } = Steps;

export default memo(function RegisterPage({ loading }) {
  const history = useHistory();
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState({
    fbUID: null,
    gg_email: null,
    name: null,
    address: null,
    phone: null,
  });

  const onClick = useCallback(
    ({ currentTarget: { title } }) => {
      switch (title) {
        case 'Prev':
          setCurrentStep(0);
          break;
        case 'Next':
          setCurrentStep(1);
          break;
        case 'Register':
          loading.current.add('register');
          register(state)
            .then((res) => {
              handleResponse(res, () => {
                history.push('/login');
              });
            })
            .finally(() => loading.current.remove('register'));
          break;
        default:
          break;
      }
    },
    [setCurrentStep, state, loading, history],
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
          fbUID: _.get(response, 'authResponse.userID', undefined),
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
        gg_email: _.get(response, 'profileObj.email', undefined),
        name: _.get(response, 'profileObj.name', undefined),
      }));
    },
    [setState],
  );

  const onInputChange = useCallback(
    ({ currentTarget: { title }, target: { value } }) => {
      if (
        value.length > 9 ||
        (value !== '' &&
          title === 'phone' &&
          _.findIndex(new RegExp(`^([0-9]*)$`).exec(value)) === -1)
      ) {
        return;
      }
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
            title="Step 1"
            status={!(state.fbUID || state.gg_email) ? 'finish' : 'process'}
            description="Link your account."
          />
          <Step
            title="Step 2"
            status={!(state.name && state.address && state.phone) ? 'finish' : 'process'}
            description="Personal information."
          />
        </Steps>
        {currentStep ? (
          <InfoGroup size={'middle'} direction={'vertical'}>
            <Avatar size={100} src={AvatarImage} />
            <Input
              onChange={onInputChange}
              title={'name'}
              value={state.name}
              placeholder={'Full name'}
            />
            <Input
              onChange={onInputChange}
              title={'address'}
              value={state.address}
              placeholder={'Address'}
            />
            <div style={{ display: 'flex' }}>
              <PhoneInput
                country={'us'}
                value={state.phone}
                prefix={'+'}
                onChange={(phone) => setState({ ...state, phone })}
              />
            </div>
          </InfoGroup>
        ) : (
          <ButtonGroup>
            <Space direction={'vertical'} size={'middle'}>
              <StyledButton
                disabled={state.fbUID}
                onClick={onLoginFacebook}
                icon={<FacebookOutlined />}
                type={'facebook'}
              >
                {'Connect with Facebook'}
              </StyledButton>
              <GoogleLogin
                clientId={process.env.GG_ID}
                render={(renderProps) => (
                  <StyledButton
                    disabled={state.gg_email}
                    onClick={renderProps.onClick}
                    icon={<GoogleOutlined />}
                    type={'google'}
                  >
                    {'Connect with Google'}
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
            {'Have already an account? '}
            <Link style={{ color: 'white' }} to="/login">
              {'Login here'}
            </Link>
          </Login>
          <ActionButtonGroup>
            {currentStep ? (
              <Button title={'Prev'} onClick={onClick}>
                {'Prev'}
              </Button>
            ) : (
              <div />
            )}
            <Button
              title={currentStep ? 'Register' : 'Next'}
              disabled={
                !(currentStep
                  ? state.name && state.address && state.phone
                  : state.fbUID || state.gg_email)
              }
              onClick={onClick}
            >
              {currentStep ? 'Register' : 'Next'}
            </Button>
          </ActionButtonGroup>
        </ActionContainer>
      </FormContainer>
    </Container>
  );
});
