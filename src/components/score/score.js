import React from 'react';
import styled from 'styled-components';
import apple from '../../image/apple.png';
import trophy from '../../image/trophy.png';

const Score = styled.div`
  display: flex;
  justify-content: center;
  
  & img {
    height: 40px;
    margin-right: 10px;
  }
  
  & img:last-of-type {
    margin-left: 15px;
  }
  
  & img:first-of-type {
    margin-left: -5px;
  }
  
  & h2 {
    margin: auto 0;
  }
`
let bestScore = localStorage.getItem('bestScore') ? localStorage.getItem('bestScore') : 0;

export default function ScoreBlock({score}) {
    if (bestScore < score) {
        bestScore = score;
        localStorage.setItem('bestScore', bestScore);
    }

    return (
        <Score>
            <img src={apple} alt="score"/>
            <h2>{score}</h2>
            <img src={trophy} alt='best_score'/>
            <h2>{bestScore}</h2>
        </Score>
    )
}

