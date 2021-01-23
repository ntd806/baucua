import styled from 'styled-components/macro';
import { Layout, Select, Space } from 'antd';
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

export const StyledSpace = styled(Space)`
  display: flex;
  .ant-space-item {
    flex: 1;
  }
`;

export const StyledSelect = styled(Select)`
  width: 100%;
`;

export const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
