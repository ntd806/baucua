import React, { memo, useCallback, useState } from 'react';
import { Steps, Space, Button, Avatar, Input } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';

import {
  Container,
  FormContainer,
  StyledButton,
  ButtonGroup,
  ActionContainer,
  InfoGroup,
} from './styled';
import Background from 'Src/images/background.jpg';

const { Step } = Steps;

export default memo(function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(0);

  const onClick = useCallback(
    ({ currentTarget: { title } }) => {
      switch (title) {
        case 'Trước':
          setCurrentStep(0);
          break;
        case 'Tiếp':
          setCurrentStep(1);
          break;
        case 'Đăng ký':
          break;
        default:
          break;
      }
    },
    [setCurrentStep],
  );

  return (
    <Container style={{ backgroundImage: `url(${Background})` }}>
      <FormContainer>
        <Steps type="navigation" size="small" current={currentStep}>
          <Step title="Bước 1" status="process" description="Liên kết tài khoản." />
          <Step title="Bước 2" status="wait" description="Thông tin cá nhân." />
        </Steps>
        {currentStep ? (
          <InfoGroup size={'middle'} direction={'vertical'}>
            <Avatar
              size={100}
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
            <Input placeholder={'Họ và tên'} />
            <Input placeholder={'Địa chỉ'} />
            <Input placeholder={'Số điện thoại'} />
          </InfoGroup>
        ) : (
          <ButtonGroup>
            <Space direction={'vertical'} size={'middle'}>
              <StyledButton icon={<FacebookOutlined />} type={'facebook'}>
                {'Liên kết với Facebook'}
              </StyledButton>
              <StyledButton icon={<GoogleOutlined />} type={'google'}>
                {'Liên kết với Google'}
              </StyledButton>
            </Space>
          </ButtonGroup>
        )}
        <ActionContainer>
          {currentStep ? (
            <Button title={'Trước'} onClick={onClick}>
              {'Trước'}
            </Button>
          ) : (
            <div />
          )}
          <Button title={currentStep ? 'Đăng ký' : 'Tiếp'} onClick={onClick}>
            {currentStep ? 'Đăng ký' : 'Tiếp'}
          </Button>
        </ActionContainer>
      </FormContainer>
    </Container>
  );
});
