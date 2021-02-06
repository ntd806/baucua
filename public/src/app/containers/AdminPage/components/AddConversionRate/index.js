import React, { memo } from 'react';
import { Card, Input } from 'antd';

import { StyledSpace } from '../../styled';

export default memo(function Options({ state: { type, number }, onChange }) {
  return (
    <>
      <StyledSpace size={'small'}>
        <Card title={'Loại'}>
          <Input
            onChange={({ currentTarget: { value } }) => onChange('type', value)}
            value={type}
          />
        </Card>
        <Card title={'Tỉ lệ'}>
          <Input
            onChange={({ currentTarget: { value } }) => onChange('number', value)}
            value={number}
          />
        </Card>
      </StyledSpace>
    </>
  );
});
