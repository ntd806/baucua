import { Button, Layout, Card, Space, Modal, Input, notification, DatePicker } from 'antd';
import React, { memo, useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';
import moment from 'moment';

import { LayoutContainer, StyledContent, Header, GroupButton, SearchContainer } from './styled';
import {
  getMembers as serviceGetMembers,
  getConversionRate as serviceGetConversionRate,
  topUp as serviceTopUp,
  lockUser as serviceLockUser,
  getSetting as serviceGetSetting,
  updateSetting as serviceUpdateSetting,
  getUsersHistory as serviceGetUsersHistory,
} from 'Src/services/admin';
import Members from './components/Members';
import Statistic from './components/Statistic';
import Options from './components/Options';
import TopUp from './components/TopUp';
import { handleResponse } from 'Src/utils/handleError';

const { Search } = Input;
const { RangePicker } = DatePicker;

export default memo(function AdminPage({ loading }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [select, setSelect] = useState('Statistic');
  const [members, setMembers] = useState([]);
  const [memberParams, setMemberParams] = useState({
    search: '',
    limit: 10,
    page: 1,
    total: 0,
  });
  const [topUpState, setTopUpState] = useState({
    userId: undefined,
    amount: '',
    name: '',
    output: '',
    conversionRate: '',
  });
  const [conversionRate, setConversionRate] = useState([]);
  const [settings, setSettings] = useState([]);
  const [settingState, setSettingState] = useState({
    isEdit: false,
    percent: '',
    gameTypeSelected: '',
  });
  const [userHistory, setUserHistory] = useState([]);
  const [userHistoryParams, setUserHistoryParams] = useState({
    startDate: moment().subtract(7, 'd'),
    endDate: moment(),
  });

  const getMembers = useCallback(() => {
    loading.current.add('getMembers');
    serviceGetMembers(memberParams)
      .then((res) => {
        handleResponse(res, ({ rows, count }) => {
          setMembers(rows);
          setMemberParams((e) => ({
            ...e,
            total: count,
          }));
        });
      })
      .finally(() => loading.current.remove('getMembers'));
  }, [loading, setMembers, memberParams, setMemberParams]);

  const getUsersHistory = useCallback(() => {
    loading.current.add('getUsersHistory');
    serviceGetUsersHistory({
      is_admin: true,
      startDate: moment(userHistoryParams.startDate).format(),
      endDate: moment(userHistoryParams.endDate).format(),
    })
      .then((res) => {
        handleResponse(res, (data) => {
          setUserHistory(
            data.map((e) => ({ ...e, login_at: moment(e.login_at).format('DD/MM/YYYY hh:mm:ss') })),
          );
        });
      })
      .finally(() => loading.current.remove('getUsersHistory'));
  }, [loading, setUserHistory, userHistoryParams]);

  const getSetting = useCallback(() => {
    loading.current.add('getSetting');
    serviceGetSetting({ is_admin: true })
      .then((res) => {
        handleResponse(res, (data) => {
          setSettings(data);
        });
      })
      .finally(() => loading.current.remove('getSetting'));
  }, [setSettings, loading]);

  const getConversionRate = useCallback(() => {
    loading.current.add('getConversionRate');
    serviceGetConversionRate()
      .then((res) => {
        handleResponse(res, (data) => {
          setConversionRate(data);
        });
      })
      .finally(() => loading.current.remove('getConversionRate'));
  }, [setConversionRate, loading]);

  const onButtonClick = useCallback(
    ({ currentTarget: { title } }) => {
      if (title === 'Logout') {
        Cookies.remove('accessToken');
        Cookies.remove('userId');
        Cookies.remove('isLogin');
        Cookies.remove('refreshToken');
        Cookies.remove('image');
        window.location.href = '/admin';
        return;
      }
      if (['Statistic', 'Members'].some((e) => e === title)) {
        const fn = {
          Members: getMembers,
          Statistic: getUsersHistory,
        };
        setSelect(title);
        _.get(fn, `[${title}]`, () => {})();
      }
    },
    [setSelect, getMembers, getUsersHistory],
  );

  const showModal = useCallback(() => {
    setIsModalVisible(true);
  }, [setIsModalVisible]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    setSettingState({ isEdit: false, percent: '', gameTypeSelected: '' });
  }, [setIsModalVisible, setSettingState]);

  const onSearchChange = useCallback(
    ({ currentTarget: { value } }) => {
      setMemberParams((e) => ({
        ...e,
        search: value,
        page: 1,
      }));
    },
    [setMemberParams],
  );

  const onTopUpClick = useCallback(
    ({ id: userId, name }) => {
      setTopUpState((e) => ({ ...e, userId, name }));
    },
    [setTopUpState],
  );

  const onTopUpCancelClick = useCallback(() => {
    setTopUpState({
      userId: undefined,
      amount: '',
      name: '',
      output: '',
      conversionRate: '',
    });
  }, []);

  const onTopUp = useCallback(() => {
    const user_id = Cookies.get('userId');
    loading.current.add('serviceTopUp');
    serviceTopUp({ user_id, summand: topUpState.output, destination_id: topUpState.userId })
      .then((res) => {
        handleResponse(res, () => {
          onTopUpCancelClick();
          notification.success({
            message: _.get(res, 'message'),
          });
        });
      })
      .finally(() => loading.current.remove('serviceTopUp'));
  }, [topUpState, loading, onTopUpCancelClick]);

  useEffect(() => {
    getConversionRate();
    getSetting();
    getUsersHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onTopUpChange = useCallback(
    (stateName, value) => {
      setTopUpState((state) => {
        let newState = {
          ...state,
          [stateName]: value,
        };
        if (newState.conversionRateSelect && newState.amount) {
          newState.output =
            _.get(
              _.find(conversionRate, { id: newState.conversionRateSelect }),
              'number_conversion',
            ) * newState.amount;
        } else {
          newState.output = 0;
        }
        return newState;
      });
    },
    [setTopUpState, conversionRate],
  );

  const onLockAction = useCallback(
    ({ id: user_id, status }) => {
      loading.current.add('serviceLockUser');
      serviceLockUser({ user_id, is_block: Boolean(status) })
        .then((res) => {
          handleResponse(res, () => {
            getMembers();
            notification.success({
              message: _.get(res, 'message'),
            });
          });
        })
        .finally(() => loading.current.remove('serviceLockUser'));
    },
    [getMembers, loading],
  );

  const onMemberPageChange = useCallback(
    (page) => {
      setMemberParams((e) => ({ ...e, page }));
    },
    [setMemberParams],
  );

  useEffect(() => {
    getMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberParams.page]);

  const onSettingSelectChange = useCallback(
    (id) => {
      const percent = _.get(_.find(settings, { id }), 'proportionality');
      setSettingState((e) => ({ ...e, gameTypeSelected: id, percent }));
    },
    [settings, setSettingState],
  );

  const onUpdateSetting = useCallback(() => {
    loading.current.add('onUpdateSetting');
    serviceUpdateSetting({
      id_options: settingState.gameTypeSelected,
      proportionality: `${settingState.percent}`,
      is_admin: true,
    })
      .then((res) => {
        handleResponse(res, () => {
          getSetting();
          setSettingState((e) => ({ ...e, isEdit: false }));
        });
      })
      .finally(() => loading.current.remove('onUpdateSetting'));
  }, [settingState, loading, getSetting]);

  const onSettingActionClick = useCallback(
    ({ currentTarget: { title } }) => {
      switch (title) {
        case 'Edit':
          setSettingState((e) => ({ ...e, isEdit: true }));
          break;
        case 'Cancel':
          setSettingState((e) => ({ ...e, isEdit: false }));
          onSettingSelectChange(settingState.gameTypeSelected);
          break;
        case 'Submit':
          onUpdateSetting();
          break;
        default:
          break;
      }
    },
    [setSettingState, onSettingSelectChange, settingState, onUpdateSetting],
  );

  const onPercentChange = useCallback(
    ({ currentTarget: { value } }) => {
      setSettingState((e) => ({ ...e, percent: value }));
    },
    [setSettingState],
  );

  const handelOk = useCallback(() => {
    loading.current.add('handelOk');
    serviceUpdateSetting({
      id_options: settingState.gameTypeSelected,
      is_play: `${1}`,
      is_admin: true,
    })
      .then((res) => {
        handleResponse(res, () => {
          getSetting();
          handleCancel();
        });
      })
      .finally(() => loading.current.remove('handelOk'));
  }, [getSetting, handleCancel, settingState, loading]);

  const onCalendarChange = useCallback((date) => {
    setUserHistoryParams({
      startDate: date[0],
      endDate: date[1],
    });
  }, []);

  const onOpenChange = useCallback(
    (open) => {
      if (!open) getUsersHistory();
    },
    [getUsersHistory],
  );

  // const playGame = useCallback(() => {
  //   const BASE_URL = process.env.BASE_URL;
  //   window.open(`${BASE_URL}/game/bet?accessToken=${Cookies.get('accessToken')}`);
  // }, []);

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
                <Button title={'Members'} onClick={onButtonClick}>
                  {'Quản lý thành viên'}
                </Button>
                <Button title={'Logout'} onClick={onButtonClick}>
                  {'Đăng xuất'}
                </Button>
              </GroupButton>
            </Card>
            <Card
              title={
                select === 'Statistic' ? (
                  <SearchContainer>
                    {'Bảng thống kê số lần online của người chơi'}
                    <RangePicker
                      format={['DD/MM/YYYY', 'DD/MM/YYYY']}
                      onCalendarChange={onCalendarChange}
                      value={[userHistoryParams.startDate, userHistoryParams.endDate]}
                      clearIcon={false}
                      onOpenChange={onOpenChange}
                    />
                  </SearchContainer>
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
              {select === 'Statistic' && <Statistic data={userHistory} />}
              {select === 'Members' && (
                <Members
                  data={members}
                  onTopUpClick={onTopUpClick}
                  onLockAction={onLockAction}
                  paging={memberParams}
                  onPageChange={onMemberPageChange}
                />
              )}
            </Card>
          </Space>
        </StyledContent>
      </Layout>
      <Modal
        title="Tùy chọn"
        visible={isModalVisible}
        onOk={settingState.isEdit ? null : handelOk}
        onCancel={handleCancel}
        okText={'Cài đặt'}
        cancelText={'Hủy'}
      >
        <Options
          settings={settings}
          state={settingState}
          onAction={onSettingActionClick}
          onSelectChange={onSettingSelectChange}
          onPercentChange={onPercentChange}
        />
      </Modal>
      <Modal
        title={`Nạp tiền tài khoản ${topUpState.name}`}
        visible={Boolean(topUpState.userId)}
        onOk={onTopUp}
        onCancel={onTopUpCancelClick}
        okText={'Nạp tiền'}
        cancelText={'Hủy'}
      >
        <TopUp
          conversionRate={conversionRate}
          amount={topUpState.amount}
          output={topUpState.output}
          conversionRateSelect={topUpState.conversionRateSelect}
          onChangeValue={onTopUpChange}
        />
      </Modal>
    </LayoutContainer>
  );
});
