import React, { memo, useCallback } from 'react';
import Table from 'Src/app/components/Table';
import { DollarCircleTwoTone, LockTwoTone, UnlockTwoTone } from '@ant-design/icons';

export default memo(function Members({
  onTopUpClick,
  data,
  onLockAction,
  paging: { total, page },
  onPageChange,
}) {
  const onActionClick = useCallback(
    (value, key) => {
      switch (key) {
        case 'topUp':
          onTopUpClick(value);
          break;
        case 'lock':
          onLockAction(value);
          break;
        default:
          break;
      }
    },
    [onTopUpClick, onLockAction],
  );
  return (
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
      actions={{
        true: [
          { Component: DollarCircleTwoTone, key: 'topUp' },
          { Component: LockTwoTone, key: 'lock', color: '#eb2f96' },
        ],
        false: [{ Component: UnlockTwoTone, key: 'lock', color: '#52c41a' }],
      }}
      actionCondition={'status'}
      onActionClick={onActionClick}
      dataSource={data}
      pagination={{ total, current: page }}
      onPageChange={onPageChange}
    />
  );
});
