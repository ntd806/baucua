import React, { memo } from 'react';
import Table from 'Src/app/components/Table';
import { EditOutlined, CreditCardOutlined, DeleteOutlined } from '@ant-design/icons';

export default memo(function Members({ onTopUpClick, data }) {
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
        { Component: EditOutlined, key: 'edit' },
        { Component: CreditCardOutlined, key: 'topUp' },
        { Component: DeleteOutlined, key: 'delete' },
      ]}
      onActionClick={onTopUpClick}
      dataSource={data}
    />
  );
});
