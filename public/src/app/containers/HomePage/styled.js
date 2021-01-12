import styled from 'styled-components/macro';
import { Layout } from 'antd';
import { media } from 'Src/styles/media';

const { Content } = Layout;

export const LayoutContainer = styled(Layout)`
  height: 100vh;
`;

export const StyledContent = styled(Content)`
  position: relative;
  ${() => media.mobile`
  margin: 16px 5px;
  `}
  ${() => media.tablet`
  margin: 16px;
  `}
`;
