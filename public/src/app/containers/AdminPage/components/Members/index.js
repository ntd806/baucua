import React, { memo, useCallback } from 'react';
import Table from 'Src/app/components/Table';
import { DollarCircleTwoTone, DeleteTwoTone } from '@ant-design/icons';

export default memo(function Members({ onTopUpClick, data, onDeleteClick }) {
  const onActionClick = useCallback(
    (value, key) => {
      switch (key) {
        case 'topUp':
          onTopUpClick(value);
          break;
        case 'delete':
          onDeleteClick(value);
          break;
        default:
          break;
      }
    },
    [onTopUpClick, onDeleteClick],
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
      actions={[
        { Component: DollarCircleTwoTone, key: 'topUp' },
        { Component: DeleteTwoTone, key: 'delete', color: '#eb2f96' },
      ]}
      onActionClick={onActionClick}
      dataSource={data}
      pagination={{ total: 50, current: 1 }}
    />
  );
});
