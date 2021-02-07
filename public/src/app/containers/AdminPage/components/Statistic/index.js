import React, { memo } from 'react';
import Table from 'Src/app/components/Table';

export default memo(function Statistic({ data = [], paging: { total, page }, onPageChange }) {
  return (
    <Table
      columns={[
        {
          title: 'Id người chơi',
          dataIndex: 'user_id',
          key: 'user_id',
        },
        {
          title: 'Tên người chơi',
          dataIndex: 'user.name',
          key: 'user',
        },
        {
          title: 'Thời gian đăng nhập lần cuối',
          dataIndex: 'login_at',
          key: 'login_at',
        },
        {
          title: 'Tổng số lần đăng nhập',
          dataIndex: 'count_time',
          key: 'count_time',
        },
      ]}
      dataSource={data}
      pagination={{ total, current: page }}
      onPageChange={onPageChange}
    />
  );
});
