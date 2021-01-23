import { Button, Layout, Card, Space, Modal, Input } from 'antd';
import React, { memo, useCallback, useState } from 'react';
import _ from 'lodash';

import { LayoutContainer, StyledContent, Header, GroupButton, SearchContainer } from './styled';
import { getMembers as serviceGetMembers } from 'Src/services/admin';
import Members from './components/Members';
import Statistic from './components/Statistic';
import Options from './components/Options';
import TopUp from './components/TopUp';

const { Search } = Input;

export default memo(function AdminPage({ loading }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [select, setSelect] = useState('Statistic');
  const [members, setMembers] = useState([]);
  const [memberParams, setMemberParams] = useState({
    search: '',
    limit: 10,
    page: 1,
  });
  const [topUpState, setTopUpState] = useState({ userId: undefined, amount: '', name: '' });

  const getMembers = useCallback(() => {
    loading.current.add('getMembers');
    serviceGetMembers(memberParams)
      .then((res) => {
        if (_.get(res, 'result')) {
          setMembers(res.result);
        }
      })
      .finally(() => loading.current.remove('getMembers'));
  }, [loading, setMembers, memberParams]);

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

  const onSearchChange = useCallback(
    ({ currentTarget: { value } }) => {
      setMemberParams((e) => ({
        ...e,
        search: value,
      }));
    },
    [setMemberParams],
  );

  const onTopUpClick = useCallback(
    ({ id: userId, name }) => {
      setTopUpState({ userId, name });
    },
    [setTopUpState],
  );

  const onTopUpCancelClick = useCallback(() => {
    setTopUpState({ userId: undefined, amount: '' });
  }, []);

  const onTopUp = useCallback(() => {}, []);

  return (
    <LayoutContainer>
      <Header>{'Dashboard'}</Header>
      <Layout>
        <StyledContent>
          <Space direction={'vertical'} size={'middle'} style={{ width: '100%', height: '100%' }}>
            <Card title="Menu" bordered={false}>
              <GroupButton>
                <Button onClick={showModal}>{'Tùy chọn'}</Button>
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
                    <Search
                      value={memberParams.search}
                      onChange={onSearchChange}
                      style={{ maxWidth: 200 }}
                      placeholder="input search text"
                      enterButton
                      onSearch={getMembers}
                    />
                  </SearchContainer>
                )
              }
              bordered={false}
            >
              {select === 'Statistic' && <Statistic />}
              {select === 'Members' && <Members data={members} onTopUpClick={onTopUpClick} />}
            </Card>
          </Space>
        </StyledContent>
      </Layout>
      <Modal
        title="Tùy chọn"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        okText={'Cài đặt'}
        cancelText={'Hủy'}
      >
        <Options />
      </Modal>
      <Modal
        title={`Nạp tiền tài khoản ${topUpState.name}`}
        visible={Boolean(topUpState.userId)}
        onOk={onTopUp}
        onCancel={onTopUpCancelClick}
        okText={'Nạp tiền'}
        cancelText={'Hủy'}
      >
        <TopUp />
      </Modal>
    </LayoutContainer>
  );
});
