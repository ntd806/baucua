import { Card, Space } from 'antd';
import styled from 'styled-components/macro';

export const Container = styled(Space)`
  width: 100%;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;

  .profile-container-item:not(:first-child) {
    display: flex;
    justify-content: center;
  }

  .form-control {
    color: black;
    width: 100%;
  }
  .country {
    color: black;
  }
`;

export const MenuContainer = styled(Space)`
  width: 100%;
  justify-content: center;
  flex-wrap: nowrap;
`;

export const StyledCard = styled(Card)`
  background-color: transparent;
  border-radius: 5px;
  .ant-card-head {
    color: white;
    font-weight: bold;
  }
`;

export const ItemContainer = styled.div`
  /* flex: 1; */
`;

export const Title = styled.h1`
  color: white;
`;

export const Text = styled.div`
  /* font-size: 1.5rem */
`;

export const ProfileTitle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const ProfileSpace = styled(Space)`
  display: flex;
`;
