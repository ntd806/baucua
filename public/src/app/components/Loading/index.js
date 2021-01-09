import React, { memo, useState, useImperativeHandle, forwardRef } from 'react';
import { ReactComponent as Logo } from 'Src/images/loading.svg';
import styled from 'styled-components/macro';

export default memo(
  forwardRef(function Loading(_, ref) {
    const [active, setActive] = useState([]);

    useImperativeHandle(ref, () => ({
      add: (name) => setActive((e) => [...e, name]),
      remove: (name) => setActive((e) => e.filter((el) => el !== name)),
      removeAll: () => setActive([]),
    }));

    return (
      <LoadingContainer active={Boolean(active.length)}>
        <Logo />
      </LoadingContainer>
    );
  }),
);

const LoadingContainer = styled.div`
  display: ${({ active }) => (active ? 'flex' : 'none')};
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
`;
