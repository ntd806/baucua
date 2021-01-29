import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import { Avatar, Button, Space, Input, notification } from 'antd';
import moment from 'moment';
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
import { handleResponse } from 'Src/utils/handleError';

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
  const [transactionPaging, setTransactionPaging] = useState({ page: 1, total: 0 });
  const [gameHistoryPaging, setGameHistoryPaging] = useState({ page: 1, total: 0 });

  const getPersonalInfo = useCallback(() => {
    loading.current.add('getPersonalInfo');
    const user_id = Cookies.get('userId');
    getProfile({ user_id })
      .then((res) => {
        handleResponse(res, (data) => {
          const {
            id,
            user: { address, name, phone },
          } = data;
          setProfile({ id, name, address, phone });
        });
      })
      .finally(() => loading.current.remove('getPersonalInfo'));
  }, [loading, setProfile]);

  const getTransactionHistory = useCallback(() => {
    loading.current.add('getTransactionHistory');
    const user_id = Cookies.get('userId');
    getTransactionH({ user_id, page: transactionPaging.page })
      .then((res) => {
        handleResponse(res, ({ rows: data, count: total }) => {
          const transactions = data.map(
            ({ id, transfer_at, status, summand: amount, destination: { name } }) => ({
              id,
              name,
              amount,
              time: moment(transfer_at).format('DD/MM/YY hh:mm:ss'),
              status: Boolean(status) ? 'Success' : 'Failure',
              type: amount > 0 ? 'Top Up' : 'WithDraw',
            }),
          );
          setTransactionHistory(transactions);
          setTransactionPaging((e) => ({ ...e, total }));
        });
      })
      .finally(() => loading.current.remove('getTransactionHistory'));
  }, [loading, setTransactionPaging, transactionPaging]);

  const getGameHistory = useCallback(() => {
    loading.current.add('getGameHistory');
    const user_id = Cookies.get('userId');
    getGameH({ user_id, page: gameHistoryPaging.page })
      .then((res) => {
        handleResponse(res, ({ rows: data, count: total }) => {
          const game = data.map(
            ({ id, created_at, win, type_bet: type, stake, place_bet: place }) => ({
              id,
              time: moment(created_at).format('DD/MM/YY hh:mm:ss'),
              status: Boolean(win) ? 'Win' : 'Lose',
              type,
              stake,
              place,
            }),
          );
          setGameHistory(game);
          setGameHistoryPaging((e) => ({ ...e, total }));
        });
      })
      .finally(() => loading.current.remove('getGameHistory'));
  }, [loading, setGameHistory, gameHistoryPaging, setGameHistoryPaging]);

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

  const playGame = useCallback(() => {
    const BASE_URL = process.env.BASE_URL;
    window.open(`${BASE_URL}/game/bet?accessToken=${Cookies.get('accessToken')}`);
  }, []);

  const onButtonClick = useCallback(
    ({ currentTarget: { title } }) => {
      if (['Withdraw', 'Top Up'].some((e) => e === title)) {
        notification.info({
          message: 'Coming soon',
        });
      }
      if (['Edit Personal Info'].some((e) => e === title)) {
        setSelect('Personal Info');
        setIsEditProfile(true);
        return;
      }
      if (isEditProfile) setIsEditProfile(false);
      const fn = {
        'Personal Info': getPersonalInfo,
        'Transaction History': getTransactionHistory,
        'Game History': getGameHistory,
        'Play Game': playGame,
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
      playGame,
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
        handleResponse(res, () => {
          onButtonClick({ currentTarget: { title: 'Personal Info' } });
        });
      })
      .finally(() => loading.current.remove('editProfile'));
  }, [profile, onButtonClick, loading]);

  const onTransactionTablePageChange = useCallback(
    (page) => {
      setTransactionPaging((e) => ({ ...e, page }));
    },
    [setTransactionPaging],
  );

  const onGameHistoryPagingChange = useCallback(
    (page) => {
      setGameHistoryPaging((e) => ({ ...e, page }));
    },
    [setGameHistoryPaging],
  );

  useEffect(() => {
    getTransactionHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionPaging.page]);

  useEffect(() => {
    getGameHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameHistoryPaging.page]);

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
          style={{
            width: ['xs', 'sm', 'md'].some((e) => e === currentBreakpoint) ? '100%' : '80%',
          }}
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
          pagination={{ total: transactionPaging.total, current: transactionPaging.page }}
          onPageChange={onTransactionTablePageChange}
        />
      )}
      {select === 'Game History' && (
        <Table
          style={{
            width: ['xs', 'sm', 'md'].some((e) => e === currentBreakpoint) ? '100%' : '80%',
          }}
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
          pagination={{ total: gameHistoryPaging.total, current: gameHistoryPaging.page }}
          onPageChange={onGameHistoryPagingChange}
        />
      )}
      {/* </ItemContainer> */}
    </Container>
  );
});
