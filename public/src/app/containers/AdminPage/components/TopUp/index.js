import { Card, Input, Select, Space } from 'antd';
import React, { memo } from 'react';

const { Option } = Select;

export default memo(function TopUp({ handleChange }) {
  return (
    <Space size={'middle'} direction={'vertical'} style={{ width: '100%' }}>
      <Card title={'Số tiền'}>
        <Input />
      </Card>
      <Card title={'Hệ chuyển đổi'}>
        <Select defaultValue="lucy" style={{ width: '100%' }} onChange={handleChange}>
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled">Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
      </Card>
    </Space>
  );
});
