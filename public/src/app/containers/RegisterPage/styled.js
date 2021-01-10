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
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  max-width: 700px;
  min-height: 500px;
  width: 100%;
  position: relative;
  background: white;
`;

export const StyledButton = styled(Button)`
  background: ${({ type }) => color[type]};
  border-radius: 5px;
  color: white;
  min-width: 350px;
  padding: 20px;
  display: flex;
  align-items: center;
  font-size: 2em;
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
  top: 40%;
  right: 0;
  left: 0;
`;

export const ActionContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 97%;
  display: flex;
  justify-content: space-between;
`;

export const InfoGroup = styled(Space)`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  align-items: center;
  .ant-space-item:not(:first-child) {
    width: 60%;
  }
`;
