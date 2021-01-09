import { Layout } from 'antd';
import React, { memo } from 'react';
import { LayoutContainer, StyledContent } from './styled';

export default memo(function HomePage() {
  return (
    <LayoutContainer>
      <Layout>
        <StyledContent></StyledContent>
      </Layout>
    </LayoutContainer>
  );
});
