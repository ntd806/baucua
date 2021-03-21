import React, { memo } from 'react';
import { Pagination } from 'antd';
import _ from 'lodash';

import { Container, TableContainer, HeaderContainer, BodyContainer } from './styled';

export default memo(function Table({
  columns,
  dataSource = [],
  actions = [],
  onActionClick,
  style = {},
  pagination,
  actionCondition,
  onPageChange,
}) {
  return (
    <Container style={style} size={'small'} direction={'vertical'}>
      <TableContainer>
        <HeaderContainer>
          <tr>
            {columns.map(({ title, key }, idx) => (
              <th key={`${key}-${idx}`}>{title}</th>
            ))}
            {!_.isEmpty(actions) && <th>{'Actions'}</th>}
          </tr>
        </HeaderContainer>
        <BodyContainer>
          {dataSource.map((e, idx) => (
            <tr key={idx}>
              <>
                {columns.map(({ dataIndex }, id) => (
                  <td key={`${dataIndex}-${id}`}>{_.get(e, dataIndex)}</td>
                ))}
                {!_.isEmpty(actions) &&
                  (actionCondition ? (
                    <td style={{ width: '100px' }} key={`actions-${idx}`}>
                      <div className={'actions'}>
                        {actions[`${Boolean(e[actionCondition])}`].map(
                          ({ Component, key, color }) => (
                            <Component
                              style={{ margin: '5px' }}
                              key={key}
                              onClick={() => onActionClick(e, key)}
                              twoToneColor={color}
                            />
                          ),
                        )}
                      </div>
                    </td>
                  ) : (
                    <td style={{ width: '100px' }} key={`actions-${idx}`}>
                      <div className={'actions'}>
                        {actions.map(({ Component, key, color }) => (
                          <Component
                            style={{ margin: '5px' }}
                            key={key}
                            onClick={() => onActionClick(e, key)}
                            twoToneColor={color}
                          />
                        ))}
                      </div>
                    </td>
                  ))}
              </>
            </tr>
          ))}
        </BodyContainer>
      </TableContainer>
      {pagination && (
        <Pagination
          style={{ textAlign: 'center' }}
          current={pagination.current}
          total={pagination.total}
          onChange={onPageChange}
        />
      )}
    </Container>
  );
});
