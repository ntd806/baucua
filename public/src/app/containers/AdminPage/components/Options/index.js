import React, { memo, useMemo } from 'react';
import { Card, Input, Select } from 'antd';
import { EditTwoTone, CheckCircleTwoTone, CloseCircleTwoTone } from '@ant-design/icons';
import _ from 'lodash';

import { StyledSpace, StyledSelect } from '../../styled';

const { Option } = Select;

export default memo(function Options({
  settings = [],
  state: { isEdit, percent, gameTypeSelected },
  onAction,
  onSelectChange,
  onPercentChange,
}) {
  const gameType = useMemo(() => {
    return settings.map(({ game_type, id }) => (
      <Option key={id} value={game_type}>
        {game_type}
      </Option>
    ));
  }, [settings, isEdit]);

  const current = useMemo(() => {
    let record = _.find(settings, { is_play: 1 });
    return (
      <div style={{ marginBottom: 5 }}>{`Loại game đang chọn là ${_.get(
        record,
        'game_type',
      )} có tỉ lệ thắng là ${_.get(record, 'proportionality')}`}</div>
    );
  }, [settings]);

  return (
    <>
      {current}
      <StyledSpace size={'small'}>
        <Card title={'Loại game'}>
          <StyledSelect disabled={isEdit} onChange={onSelectChange} value={gameTypeSelected}>
            {gameType}
          </StyledSelect>
        </Card>
        <Card title={'Tỉ lệ thắng'}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Input type={'number'} onChange={onPercentChange} disabled={!isEdit} value={percent} />
            {isEdit ? (
              <>
                <CheckCircleTwoTone
                  title={'Submit'}
                  style={{ margin: '0px 5px' }}
                  twoToneColor="#52c41a"
                  onClick={onAction}
                />
                <CloseCircleTwoTone
                  title={'Cancel'}
                  style={{ margin: '0px 5px' }}
                  twoToneColor="#eb2f96"
                  onClick={onAction}
                />
              </>
            ) : (
              <EditTwoTone title={'Edit'} style={{ margin: '0px 5px' }} onClick={onAction} />
            )}
          </div>
        </Card>
      </StyledSpace>
    </>
  );
});
