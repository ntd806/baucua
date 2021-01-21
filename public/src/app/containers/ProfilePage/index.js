import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { Avatar, Button, Space, Input } from 'antd';
// import moment from 'moment';
import Cookies from 'js-cookie';
import _ from 'lodash';

import AvatarImage from 'Src/images/avatar.png';
import {
  Container,
  MenuContainer,
  StyledCard,
  Title,
  Text,
  ProfileTitle,
  ProfileSpace,
} from './styled';
import { getCurrentBreakpoint } from 'Src/styles/media';
import { getProfile, getTransactionH, getGameH, editProfile } from 'Src/services/profile';
import Table from 'Src/app/components/Table';
import { handleError } from 'Src/utils/handleError';

const MENU = [
  { name: 'Personal Info', title: 'Personal Info', key: 'PersonalInfo' },
  { name: 'Edit Personal Info', title: 'Edit Personal Info', key: 'EditPersonalInfo' },
  { name: 'Transaction History', title: 'Transaction History', key: 'TransactionHistory' },
  { name: 'Game History', title: 'Game History', key: 'GameHistory' },
  { name: 'Play Game', title: 'Play Game', key: 'PlayGame' },
  { name: 'Withdraw', title: 'Withdraw', key: 'Withdraw' },
  { name: 'Top Up', title: 'Top Up', key: 'TopUp' },
];

export default memo(function Profile({ loading }) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(() => getCurrentBreakpoint(window));
  const [select, setSelect] = useState('Personal Info');
  const [profile, setProfile] = useState({ name: '', address: '', phone: '', avatar: '' });
  const [transactionHistory, setTransactionHistory] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [isEditProfile, setIsEditProfile] = useState(false);

  const getPersonalInfo = useCallback(() => {
    loading.current.add('getPersonalInfo');
    const user_id = Cookies.get('userId');
    getProfile({ user_id })
      .then((res) => {
        if (_.get(res, 'success')) {
          const result = _.get(res, 'result', {});
          const {
            id,
            user: { address, name, phone },
          } = result;
          setProfile({ id, name, address, phone });
        } else {
          handleError(_.get(res, 'message'));
        }
      })
      .finally(() => loading.current.remove('getPersonalInfo'));
  }, [loading, setProfile]);

  const getTransactionHistory = useCallback(() => {
    loading.current.add('getTransactionHistory');
    getTransactionH()
      .then((res) => {
        if (_.get(res, 'result')) {
          setTransactionHistory(res.result);
        }
      })
      .finally(() => loading.current.remove('getTransactionHistory'));
  }, [loading]);

  const getGameHistory = useCallback(() => {
    loading.current.add('getGameHistory');
    getGameH()
      .then((res) => {
        if (_.get(res, 'result')) {
          setGameHistory(res.result);
        }
      })
      .finally(() => loading.current.remove('getGameHistory'));
  }, [loading]);

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getCurrentBreakpoint(window);
      if (newBreakpoint !== currentBreakpoint) {
        setCurrentBreakpoint(newBreakpoint);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [currentBreakpoint]);

  useEffect(() => {
    getPersonalInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onButtonClick = useCallback(
    ({ currentTarget: { title } }) => {
      if (['Edit Personal Info'].some((e) => e === title)) {
        setIsEditProfile(true);
        return;
      }
      if (isEditProfile) setIsEditProfile(false);
      const fn = {
        'Personal Info': getPersonalInfo,
        'Transaction History': getTransactionHistory,
        'Game History': getGameHistory,
      };
      setSelect(title);
      _.get(fn, `[${title}]`, () => {})();
    },
    [
      setSelect,
      getPersonalInfo,
      getTransactionHistory,
      getGameHistory,
      isEditProfile,
      setIsEditProfile,
    ],
  );

  const menu = useMemo(() => {
    return MENU.map(({ name, title, key }) => (
      <Button key={key} onClick={onButtonClick} title={title}>
        {name}
      </Button>
    ));
  }, [onButtonClick]);

  const onTextChange = useCallback(({ currentTarget: { title, value } }) => {
    setProfile((e) => ({
      ...e,
      [title]: value,
    }));
  }, []);

  const onEditProfile = useCallback(() => {
    loading.current.add('editProfile');
    const user_id = Cookies.get('userId');
    const { phone, name, address } = profile;
    editProfile({ user_id, phone, name, address })
      .then((res) => {
        if (_.get(res, 'success')) {
          onButtonClick({ currentTarget: { title: 'Personal Info' } });
        } else {
          handleError(_.get(res, 'message'));
        }
      })
      .finally(() => loading.current.remove('editProfile'));
  }, [profile, onButtonClick, loading]);

  return (
    <Container
      prefixCls={`profile-container`}
      size={'large'}
      direction={'vertical'}
      align={'center'}
    >
      <MenuContainer
        size={'large'}
        direction={
          ['xs', 'sm', 'md'].some((e) => e === currentBreakpoint) ? 'vertical' : 'horizontal'
        }
        align={'center'}
      >
        <Avatar
          size={{ xs: 150, sm: 150, md: 150, lg: 200, xl: 250, xxl: 300 }}
          src={profile.avatar || AvatarImage}
        />
        <StyledCard title={'Menu'} size={'small'}>
          <Space size={'large'} wrap>
            {menu}
          </Space>
        </StyledCard>
      </MenuContainer>
      {/* <ItemContainer> */}
      {select === 'Personal Info' && (
        <>
          <Title>{'Personal Info'}</Title>
          <ProfileSpace prefixCls={'profile-space'} size={'small'}>
            <ProfileTitle>
              <Text>{'Name:'}</Text>
              <Text>{'Phone:'}</Text>
              <Text>{'Address:'}</Text>
              {/* <Text>{'Account linking'}</Text> */}
            </ProfileTitle>
            <div>
              {isEditProfile ? (
                <>
                  <Input onChange={onTextChange} title={'name'} value={profile.name} />
                  <Input onChange={onTextChange} title={'phone'} value={profile.phone} />
                  <Input onChange={onTextChange} title={'address'} value={profile.address} />
                </>
              ) : (
                <>
                  <Text>{profile.name}</Text>
                  <Text>{profile.phone}</Text>
                  <Text>{profile.address}</Text>
                </>
              )}
              {/* <Text>{'Account linking'}</Text> */}
            </div>
          </ProfileSpace>
          {isEditProfile && <Button onClick={onEditProfile}>{'Submit'}</Button>}
        </>
      )}
      {select === 'Transaction History' && (
        <Table
          bordered
          columns={[
            {
              title: 'Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Transaction Amount',
              dataIndex: 'amount',
              key: 'amount',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
            },
            {
              title: 'Time',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
            },
          ]}
          dataSource={transactionHistory}
        />
      )}
      {select === 'Game History' && (
        <Table
          bordered
          columns={[
            {
              title: 'Type',
              dataIndex: 'type',
              key: 'type',
            },
            {
              title: 'Place',
              dataIndex: 'place',
              key: 'place',
            },
            {
              title: 'Stake',
              dataIndex: 'stake',
              key: 'stake',
            },
            {
              title: 'Time',
              dataIndex: 'time',
              key: 'time',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
            },
          ]}
          dataSource={gameHistory}
          rowKey={'name'}
        />
      )}
      {/* </ItemContainer> */}
    </Container>
  );
});
