import styled from 'styled-components/macro';
import { Button, Space } from 'antd';

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

export const StyledButton = styled(Button)`
  background: ${({ type }) => color[type]};
  border-radius: 5px;
  color: white;
  min-width: 350px;
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 1.5em;
  :active {
    background: ${({ type }) => color[type]};
    color: white;
  }
  :hover {
    background: ${({ type }) => color[type]};
    color: white;
  }
  :focus {
    background: ${({ type }) => color[type]};
    color: white;
  }
  .anticon {
    line-height: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 20%;
  right: 0;
  left: 0;
`;

export const ActionContainer = styled(Space)`
  position: absolute;
  bottom: 10px;
  width: 97%;
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

export const Register = styled.div`
  text-align: center;
`;

export const StyledRedirect = styled.div`
  text-align: end;
  color: #1890ff;
  cursor: pointer;
`;

export const Title = styled.h2`
  text-align: center;
  color: white;
`;
