import React, { memo } from 'react';
import { Image, Layout, Menu } from 'antd';

import Background from 'Src/images/background.jpg';

const { Header } = Layout;

export default memo(function HomePage() {
  return (
    <Layout>
      <Header style={{ padding: 0 }}>
        <Menu theme={'light'} mode="horizontal">
          <Menu.Item
            key={'Login'}
            onClick={() => {
              window.location.href = '/login';
            }}
          >
            {'Đăng nhập'}
          </Menu.Item>
          <Menu.Item key={'Chơi game'}>{'Chơi game'}</Menu.Item>
        </Menu>
      </Header>
      <Image preview={false} src={Background} />
    </Layout>
  );
});
