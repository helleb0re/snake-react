import React from 'react';
import styled from 'styled-components';
import snake_logo from '../../image/snake_logo.png';

const Header = styled.header`
  display: flex;
  margin-bottom: 15px;
`

const Title = styled.h1`
  display: block;
  margin: auto 15px auto auto;
  font-size: 40px;
`

const Logo = styled.img`
  margin-right: auto;
`

export default function HeaderBlock() {
    return (
        <>
            <Header>
                <Title>Snake Game</Title>
                <Logo src={snake_logo} alt='snake_logo'/>
            </Header>
        </>
    )
}