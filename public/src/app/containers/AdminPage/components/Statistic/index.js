import React, { memo } from 'react';
import Table from 'Src/app/components/Table';

export default memo(function Statistic() {
  return (
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
  );
});
