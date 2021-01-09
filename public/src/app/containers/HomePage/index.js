import { Layout } from 'antd';
import React, { memo, useRef, useState, useCallback, useEffect } from 'react';
import { LayoutContainer, StyledContent } from './styled';
import LeftMenu from 'Components/LeftMenu';
import Header from 'Components/Header';
import Loading from 'Components/Loading';
import Tasks from 'Containers/views/Tasks';
import ToolDataLL from 'Containers/views/ToolDataLL';
import Cookies from 'js-cookie';

export default memo(function HomePage() {
  const [title, setTitle] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const loading = useRef();

  const onChangeMenu = useCallback((name) => {
    setTitle(name);
  }, []);

  useEffect(() => {
    setIsLogin(Boolean(Cookies.get('token')));
  }, []);

  return (
    <LayoutContainer>
      <LeftMenu onChangeMenu={onChangeMenu} />
      <Layout>
        <Header title={title} />
        <StyledContent>
          <Loading ref={loading} />
          {
            isLogin ? 
          }
          {title === 'My Task' && <Tasks loading={loading} />}
          {title === 'Tool Data LL' && <ToolDataLL loading={loading} />}
        </StyledContent>
      </Layout>
    </LayoutContainer>
  );
});
