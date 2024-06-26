import React from "react";
import styled from "styled-components";

export const LoadingSpinner = ({ size = DEFAULTSIZE }) => (
  <S.Ring size={size}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </S.Ring>
);

const DEFAULTSIZE = 80;

const S = {
  Ring: styled.div`
    display: inline-block;
    margin-top: 1rem;
    position: relative;
    box-sizing: border-box;
    width: ${({ size }) => `${size}px`};
    height: ${({ size }) => `${size}px`};
    color: #1c4c5b;
    & div {
      box-sizing: border-box;
      display: block;
      position: absolute;
      width: 64px;
      height: 64px;
      margin: 8px;
      border: 8px solid currentColor;
      border-radius: 50%;
      animation: spinner-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
      border-color: currentColor transparent transparent transparent;
    }
    & div:nth-child(1) {
      animation-delay: -0.45s;
    }
    & div:nth-child(2) {
      animation-delay: -0.3s;
    }
    & div:nth-child(3) {
      animation-delay: -0.15s;
    }
    @keyframes spinner-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `,
};
