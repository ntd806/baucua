import styled from 'styled-components/macro';
import { Layout } from 'antd';
import { media } from 'Src/styles/media';

const { Content, Header: HeaderAntd } = Layout;

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

export const Header = styled(HeaderAntd)`
  color: white;
  cursor: default;
`;

export const GroupButton = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;
