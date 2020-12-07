import React, {useRef, useEffect} from 'react';
import src from '../../image/snake-graphics.png';
import bckSrc from '../../image/field.png';
import gOSrc from '../../image/gameOver.png';
import startSrc from '../../image/start.png';
import endSrc from '../../image/textGameOver.png';
import styled from 'styled-components';

const img = new Image();
img.src = src;
const backgroundImg = new Image();
backgroundImg.src = bckSrc;
const gameOverImg = new Image();
gameOverImg.src = gOSrc;
const startImg = new Image();
startImg.src = startSrc;
const endImg = new Image();
endImg.src = endSrc;

const cellSize = 30;

const CanvasStyle = styled.canvas`
  display: flex;
  margin: 15px auto;
  border: 5px solid yellowgreen;
  border-radius: 5px;
`

export default function Canvas({snake, food, direction, start, gameOver}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        (() => {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height);
            if (gameOver || !start) {
                context.filter = 'blur(4px)';
            }
            context.drawImage(backgroundImg, 0, 0, context.canvas.width, context.canvas.height);
            if (start) {
                snake.forEach((cell, i) => {
                    if (i === 0) {
                        switch (direction) {
                            case 'ArrowRight':
                                context.drawImage(img, 64*4, 0, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                                break;
                            case 'ArrowLeft':
                                context.drawImage(img, 64*3, 64, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                                break;
                            case 'ArrowUp':
                                context.drawImage(img, 64*3, 0, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                                break;
                            case 'ArrowDown':
                                context.drawImage(img, 64*4, 64, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                                break;
                                default:
                                    break;
                        }
                    } else if (i === snake.length - 1) {
                        if (snake[i-1].posX - cell.posX > 0) {
                            context.drawImage(img, 64*4, 64*2, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if (snake[i-1].posX - cell.posX < 0) {
                            context.drawImage(img, 64*3, 64*3, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if (snake[i-1].posY - cell.posY > 0) {
                            context.drawImage(img, 64*4, 64*3, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if (snake[i-1].posY - cell.posY < 0) {
                            context.drawImage(img, 64*3, 64*2, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        }
                    } else {
                        const dif = {
                            leading: {
                                posX: snake[i-1].posX - cell.posX,
                                posY: snake[i-1].posY - cell.posY
                            },
                            previous: {
                                posX: cell.posX - snake[i+1].posX,
                                posY: cell.posY - snake[i+1].posY
                            }
                        }
                        if ((dif.leading.posY === -cellSize && dif.leading.posX === 0 && dif.previous.posY === 0 && dif.previous.posX === cellSize) ||
                            (dif.leading.posY === 0 && dif.leading.posX === -cellSize && dif.previous.posY === cellSize && dif.previous.posX === 0)) {
                            context.drawImage(img, 64*2, 64*2, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if ((dif.leading.posY === 0 && dif.leading.posX === cellSize && dif.previous.posY === -cellSize && dif.previous.posX === 0) ||
                                   (dif.leading.posY === cellSize && dif.leading.posX === 0 && dif.previous.posY === 0 && dif.previous.posX === -cellSize)) {
                            context.drawImage(img, 0, 0, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if ((dif.leading.posY === 0 && dif.leading.posX === -cellSize && dif.previous.posY === -cellSize && dif.previous.posX === 0) ||
                                   (dif.leading.posY === cellSize && dif.leading.posX === 0 && dif.previous.posY === 0 && dif.previous.posX === cellSize)) {
                            context.drawImage(img, 64*2, 0, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if ((dif.leading.posY === -cellSize && dif.leading.posX === 0 && dif.previous.posY === 0 && dif.previous.posX === -cellSize) ||
                                   (dif.leading.posY === 0 && dif.leading.posX === cellSize && dif.previous.posY === cellSize && dif.previous.posX === 0)) {
                            context.drawImage(img, 0, 64, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if ((dif.leading.posY === 0 && dif.leading.posX === cellSize && dif.previous.posY === 0 && dif.previous.posX === cellSize) ||
                                   (dif.leading.posY === 0 && dif.leading.posX === -cellSize && dif.previous.posY === 0 && dif.previous.posX === -cellSize)) {
                            context.drawImage(img, 64, 0, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        } else if ((dif.leading.posY === cellSize && dif.leading.posX === 0 && dif.previous.posY === cellSize && dif.previous.posX === 0) ||
                                   (dif.leading.posY === -cellSize && dif.leading.posX === 0 && dif.previous.posY === -cellSize && dif.previous.posX === 0)) {
                            context.drawImage(img, 64*2, 64, 64, 64, cell.posX, cell.posY, cellSize, cellSize);
                        }
                    }
                });
                context.drawImage(img, 0, 64*3, 64, 64, food.posFoodX, food.posFoodY, cellSize, cellSize);
            }
            if (gameOver) {
                context.filter = 'none';
                context.drawImage(endImg, 275, 280);
            } else if (!start) {
                context.filter = 'none';
                context.drawImage(startImg, 300, 300);
            }
        })();

    }, [snake, food, direction, start, gameOver]);

    return <CanvasStyle ref={canvasRef} className='board' width='1020' height='660'/>
}
