import { Button, Layout, Card, Space, Modal, Select, Input } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import { EditOutlined, CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';
import _ from 'lodash';

import {
  LayoutContainer,
  StyledContent,
  Header,
  GroupButton,
  StyledSpace,
  StyledSelect,
  SearchContainer,
} from './styled';
import Table from 'Src/app/components/Table';
import { getMembers as serviceGetMembers } from 'Src/services/admin';

const { Option } = Select;
const { Search } = Input;

export default memo(function AdminPage({ loading }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [select, setSelect] = useState('Statistic');
  const [members, setMembers] = useState([]);

  const getMembers = useCallback(() => {
    loading.current.add('getMembers');
    serviceGetMembers()
      .then((res) => {
        if (_.get(res, 'result')) {
          setMembers(res.result);
        }
      })
      .finally(() => loading.current.remove('getMembers'));
  }, [loading, setMembers]);

  const onButtonClick = useCallback(
    ({ currentTarget: { title } }) => {
      if (['Statistic', 'Members'].some((e) => e === title)) {
        const fn = {
          Members: getMembers,
        };
        setSelect(title);
        _.get(fn, `[${title}]`, () => {})();
      }
    },
    [setSelect, getMembers],
  );

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
                <Button title={'Statistic'} onClick={onButtonClick}>
                  {'Thống kê'}
                </Button>
                <Button> {'Bắt đầu game'}</Button>
                <Button title={'Members'} onClick={onButtonClick}>
                  {'Quản lý thành viên'}
                </Button>
              </GroupButton>
            </Card>
            <Card
              title={
                select === 'Statistic' ? (
                  'Bảng thống kê có 6 con vật trong trò chơi'
                ) : (
                  <SearchContainer>
                    {'Danh sách thành viên'}
                    <Search style={{ maxWidth: 200 }} placeholder="input search text" enterButton />
                  </SearchContainer>
                )
              }
              bordered={false}
            >
              {select === 'Statistic' && (
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
                  rowKey={'name'}
                  dataSource={[]}
                />
              )}
              {select === 'Members' && (
                <Table
                  columns={[
                    {
                      title: 'Họ Tên',
                      dataIndex: 'name',
                      key: 'name',
                    },
                    {
                      title: 'Địa chỉ',
                      dataIndex: 'address',
                      key: 'address',
                    },
                    {
                      title: 'Số điện thoại',
                      dataIndex: 'phone',
                      key: 'phone',
                    },
                  ]}
                  actions={[
                    { Component: EditOutlined, key: 'edit' },
                    { Component: CreditCardOutlined, key: 'topUp' },
                    { Component: DeleteOutlined, key: 'delete' },
                  ]}
                  onActionClick={(key) => {
                    console.log(key);
                  }}
                  dataSource={members}
                />
              )}
            </Card>
          </Space>
        </StyledContent>
      </Layout>
    </LayoutContainer>
  );
});
