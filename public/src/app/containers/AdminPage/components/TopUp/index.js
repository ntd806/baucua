import { Card, Input, Select, Space } from 'antd';
import React, { memo, useMemo, useCallback } from 'react';

import { StyledSpace } from './styled';

const { Option } = Select;

export default memo(function TopUp({
  conversionRate,
  onChangeValue,
  output,
  amount,
  conversionRateSelect,
}) {
  const onChange = useCallback(
    (e) => {
      if (typeof e === 'object') {
        const {
          currentTarget: { value },
        } = e;
        onChangeValue('amount', value);
      } else {
        onChangeValue('conversionRateSelect', e);
      }
    },
    [onChangeValue],
  );

  const options = useMemo(
    () =>
      conversionRate.map(({ type, id }) => (
        <Option key={id} value={id}>
          {type}
        </Option>
      )),
    [conversionRate],
  );

  return (
    <Space size={'middle'} direction={'vertical'} style={{ width: '100%' }}>
      <StyledSpace size={'middle'} prefixCls={'space-amount'} style={{ width: '100%' }}>
        <Card title={'Số tiền'}>
          <Input value={amount} onChange={onChange} type={'number'} min={1} />
        </Card>
        <Card title={'Hệ chuyển đổi'}>
          <Select value={conversionRateSelect} style={{ width: '100%' }} onChange={onChange}>
            {options}
          </Select>
        </Card>
      </StyledSpace>
      <Card title={'Số điểm'}>
        <Input value={output} disabled />
      </Card>
    </Space>
  );
});
