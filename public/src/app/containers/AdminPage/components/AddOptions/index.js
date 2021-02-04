import React, { memo } from 'react';
import { Card, Input } from 'antd';

import { StyledSpace } from '../../styled';

export default memo(function Options({ state: { percent, gameType }, onChange }) {
  return (
    <>
      <StyledSpace size={'small'}>
        <Card title={'Loại game'}>
          <Input
            type={'number'}
            onChange={({ currentTarget: { value } }) => onChange('gameType', value)}
            value={gameType}
          />
        </Card>
        <Card title={'Tỉ lệ thắng'}>
          <Input
            type={'number'}
            onChange={({ currentTarget: { value } }) => onChange('percent', value)}
            value={percent}
          />
        </Card>
      </StyledSpace>
    </>
  );
});
