import styled from 'styled-components/macro';
import { Space } from 'antd';

const color = {
  facebook: '#4468BE',
  google: '#BF4D3B',
};

export const Container = styled.div`
  height: 100vh;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background-size: auto;
`;

export const FormContainer = styled.div`
  padding: 10px;
  max-width: 700px;
  min-height: 500px;
  width: 100%;
  position: relative;
`;

export const InfoGroup = styled(Space)`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-space-item {
    width: 60%;
    text-align: center;
  }
`;

export const Title = styled.h2`
  text-align: center;
  color: white;
`;
