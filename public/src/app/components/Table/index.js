import React, { memo } from 'react';
import { Pagination } from 'antd';

import { Container, TableContainer, HeaderContainer, BodyContainer } from './styled';

export default memo(function Table({
  columns,
  dataSource = [],
  actions = [],
  onActionClick,
  style = {},
  pagination,
}) {
  return (
    <Container style={style} size={'small'} direction={'vertical'}>
      <TableContainer>
        <HeaderContainer>
          <tr>
            {columns.map(({ title, key }, idx) => (
              <th key={`${key}-${idx}`}>{title}</th>
            ))}
            {actions.length > 0 && <th>{'Actions'}</th>}
          </tr>
        </HeaderContainer>
        <BodyContainer>
          {dataSource.map((e, idx) => (
            <tr key={idx}>
              <>
                {columns.map(({ dataIndex }, id) => (
                  <td key={`${dataIndex}-${id}`}>{e[dataIndex]}</td>
                ))}
                {actions.length > 0 && (
                  <td key={`actions-${idx}`}>
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
                )}
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
        />
      )}
    </Container>
  );
});
