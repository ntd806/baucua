import React, { memo, useCallback, useState } from 'react';
import { Input, Button } from 'antd';

import { Container, FormContainer, InfoGroup, Title } from './styled';
import { login } from 'Src/services/admin';
import { handleResponse } from 'Src/utils/handleError';

export default memo(function AdminLoginPage({ loading }) {
  const [state, setState] = useState({
    username: '',
    password: '',
  });

  const onLogin = useCallback(() => {
    let params = { ...state };
    loading.current.add('login');
    login(params)
      .then((res) => {
        handleResponse(res, ({ accessToken, refreshToken, user: { id } }) => {
          let now = new Date();
          const time = now.getTime();
          const expires = time + 599999;
          now.setTime(expires);
          document.cookie = `userId=${id};expires=${now.toUTCString()};path=/`;
          document.cookie = `accessToken=${accessToken};expires=${now.toUTCString()};path=/`;
          document.cookie = `refreshToken=${refreshToken};expires=${now.toUTCString()};path=/`;
          window.location.href = '/admin';
        });
      })
      .finally(() => loading.current.remove('login'));
  }, [state, loading]);

  const onInputChange = useCallback(({ currentTarget: { title }, target: { value } }) => {
    setState((e) => ({
      ...e,
      [title]: value,
    }));
  }, []);

  return (
    <Container>
      <FormContainer>
        <InfoGroup size={'middle'} direction={'vertical'}>
          <Title>{'Đăng nhập'}</Title>
          <Input
            onChange={onInputChange}
            title={'username'}
            value={state.username}
            placeholder={'User name'}
          />
          <Input
            onChange={onInputChange}
            title={'password'}
            value={state.password}
            placeholder={'Password'}
            type={'password'}
          />
          <Button disabled={!(state.username && state.password)} onClick={onLogin}>
            {'Đăng nhập'}
          </Button>
        </InfoGroup>
      </FormContainer>
    </Container>
  );
});
