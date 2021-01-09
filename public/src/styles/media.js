import { css } from 'styled-components';

export const sizes = {
  xs: '480px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1400px',
};

export const screenSizes = {
  fullhd: 1408,
  widescreen: 1215,
  desktop: 1023,
  tablet: 768,
  mobile: 0,
};

export const respondTo = Object.keys(sizes).reduce((accumulator, label) => {
  accumulator[label] = (...args) => css`
    @media (min-width: ${sizes[label]}) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const media = Object.keys(screenSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${screenSizes[label] / 16}rem) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});

export const getCurrentBreakpoint = ({ window: { innerWidth = 0 } }) => {
  let currentBreakPoint = '';
  if (innerWidth < 576) {
    currentBreakPoint = 'xs';
  }
  if (innerWidth >= 576 && innerWidth < 768) {
    currentBreakPoint = 'sm';
  }
  if (innerWidth >= 768 && innerWidth < 992) {
    currentBreakPoint = 'md';
  }
  if (innerWidth >= 992 && innerWidth < 1200) {
    currentBreakPoint = 'lg';
  }
  if (innerWidth >= 1200 && innerWidth < 1600) {
    currentBreakPoint = 'xl';
  }
  if (innerWidth >= 1600) {
    currentBreakPoint = 'xxl';
  }
  return currentBreakPoint;
};
