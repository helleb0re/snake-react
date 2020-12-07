import styled from "styled-components";

export const Button = styled.button`
    display: block;
    border-radius: 10px;
    background-color: #7ee8fa;
    cursor: pointer;
    outline: none;
    border: none;
    background-image: linear-gradient(315deg, #7ee8fa 0%, #80ff72 74%);
    box-shadow: 0 5px #666666;
    font-family: 'Goldman', cursive;
    font-weight: bold;
    font-size: 24px;
    height: 50px;
    width: 100px;

  &:active {
    box-shadow: 0 2px #1f1f1f;
    transform: translateY(4px);
  }

  &:first-of-type {
    float: left;
    margin: 0 20px 0 44.5%;
  }
`