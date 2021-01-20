import React, { memo } from 'react';
import { Card, Select } from 'antd';

import { StyledSpace, StyledSelect } from '../../styled';

const { Option } = Select;

export default memo(function Options() {
  return (
    <StyledSpace size={'small'}>
      <Card title={'Loại game'}>
        <StyledSelect defaultValue="lucy">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled">Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </StyledSelect>
      </Card>
      <Card title={'Tỉ lệ thắng'}>
        <StyledSelect defaultValue="lucy">
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled">Disabled</Option>
          <Option value="Yiminghe">yiminghe</Option>
        </StyledSelect>
      </Card>
    </StyledSpace>
  );
});
