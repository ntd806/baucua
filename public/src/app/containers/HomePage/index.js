import { Button, Layout, Card, Select, Space, Table } from 'antd';
import React, { memo } from 'react';
import { LayoutContainer, StyledContent, Header, GroupButton } from './styled';

export default memo(function HomePage() {
  return (
    <LayoutContainer>
      <Header>{'Dashboard'}</Header>
      <Layout>
        <StyledContent>
          <Space direction={'vertical'} size={'middle'} style={{ width: '100%', height: '100%' }}>
            <Card title="Menu" bordered={false}>
              <GroupButton>
                <Select
                  placeholder={'Tùy chọn'}
                  dropdownRender={() => {
                    return 'abc wd wed wed wed wd ewd  ew';
                  }}
                />
                <Button>{'Thống kê'}</Button>
                <Button>{'Bắt đầu game'}</Button>
                <Button>{'Quản lý thành viên'}</Button>
              </GroupButton>
            </Card>
            <Card title="Bảng thống kê có 6 con vật trong trò chơi" bordered={false}>
              <Table
                bordered
                columns={[
                  {
                    title: 'STT',
                    dataIndex: 'id',
                    key: 'id',
                  },
                  {
                    title: 'Tổng con Nai',
                    dataIndex: 'nai',
                    key: 'nai',
                  },
                  {
                    title: 'Tổng con Bầu',
                    dataIndex: 'bau',
                    key: 'bau',
                  },
                  {
                    title: 'Tổng con Gà',
                    dataIndex: 'ga',
                    key: 'ga',
                  },
                  {
                    title: 'Tổng con Tôm',
                    dataIndex: 'tom',
                    key: 'tom',
                  },
                  {
                    title: 'Tổng con Cua',
                    dataIndex: 'cua',
                    key: 'cua',
                  },
                  {
                    title: 'Tổng con Cá',
                    dataIndex: 'ca',
                    key: 'ca',
                  },
                ]}
                dataSource={[]}
              />
            </Card>
          </Space>
        </StyledContent>
      </Layout>
    </LayoutContainer>
  );
});
