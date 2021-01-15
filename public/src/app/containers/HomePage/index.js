import { Button, Layout, Card, Space, Table, Modal, Select } from 'antd';
import React, { memo, useCallback, useState } from 'react';

import {
  LayoutContainer,
  StyledContent,
  Header,
  GroupButton,
  StyledSpace,
  StyledSelect,
} from './styled';

const { Option } = Select;

export default memo(function HomePage() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);

  const handleOk = useCallback(() => {
    setIsModalVisible(false);
  }, [setIsModalVisible]);

  return (
    <LayoutContainer>
      <Header>{'Dashboard'}</Header>
      <Layout>
        <StyledContent>
          <Space direction={'vertical'} size={'middle'} style={{ width: '100%', height: '100%' }}>
            <Card title="Menu" bordered={false}>
              <GroupButton>
                <Button onClick={showModal}>{'Tùy chọn'}</Button>
                <Modal
                  title="Tùy chọn"
                  visible={isModalVisible}
                  onOk={handleOk}
                  onCancel={handleOk}
                  okText={'Cài đặt'}
                  cancelText={'Hủy'}
                >
                  <StyledSpace size={'small'}>
                    <Card title={'Loại game'}>
                      <StyledSelect defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </StyledSelect>
                    </Card>
                    <Card title={'Tỉ lệ thắng'}>
                      <StyledSelect defaultValue="lucy">
                        <Option value="jack">Jack</Option>
                        <Option value="lucy">Lucy</Option>
                        <Option value="disabled">Disabled</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                      </StyledSelect>
                    </Card>
                  </StyledSpace>
                </Modal>
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
