import React, { Component } from 'react';
import Canvas from "../canvas/canvas";
import {Button} from '../button/button';
import HeaderBlock from "../header/header";
import ScoreBlock from "../score/score";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.cellSize = 30;
        this.board = {height: 660, width: 1020};
        this.timerId = undefined;
        this.newDirection = 'ArrowRight';
        this.oppositeKey = {
            'ArrowRight': 'ArrowLeft',
            'ArrowLeft': 'ArrowRight',
            'ArrowUp': 'ArrowDown',
            'ArrowDown': 'ArrowUp'
        };
        this.gameplayKey = Object.keys(this.oppositeKey);
        this.state = {
            snake: [{posX: 90, posY: 30}, {posX: 60, posY: 30}, {posX: 30, posY: 30}, {posX: 0, posY: 30}],
            food: undefined,
            mainDirection: 'ArrowRight',
            start: false,
            gameOver: false,
            score: 0,
        };
        this.changeDirection = this.changeDirection.bind(this);
        this.startGame = this.startGame.bind(this);
        this.resetGame = this.resetGame.bind(this);
        this.changePos = this.changePos.bind(this);
        this.checkCollision = this.checkCollision.bind(this);
        this.snakeCollision = this.snakeCollision.bind(this);
        this.createFood = this.createFood.bind(this);
    }
    startGame() {
        this.setState({
            food: this.createFood(this.state.snake),
            start: true,
        });
        this.timerId = setInterval(this.changePos, 80);
        window.addEventListener('keydown', this.changeDirection);
    }
    changeDirection(event) {
        if (this.gameplayKey.includes(event.key)) {
            this.newDirection = event.key;
        }
    }
    changePos() {
        let {snake, mainDirection, food, score}  = this.state;
        const direction = this.newDirection !== this.oppositeKey[mainDirection] ? this.newDirection : mainDirection;
        let eatFoodVar = 1;
        let {posX, posY} = snake[0];
        switch (direction) {
            case 'ArrowRight':
                posX += this.cellSize;
                break;
            case 'ArrowLeft':
                posX -= this.cellSize;
                break;
            case 'ArrowDown':
                posY += this.cellSize;
                break;
            case 'ArrowUp':
                posY -= this.cellSize;
                break;
            default:
                break;
        }
        if (this.snakeCollision(snake, posX, posY)) {
            clearInterval(this.timerId);
            window.removeEventListener('keydown', this.changeDirection);
            this.setState({gameOver: true});
            return;
        }
        if (posX === food.posFoodX && posY === food.posFoodY) {
            eatFoodVar = 0;
            score++;
        }
        let newState = {
            snake: [{posX, posY}, ...snake.slice(0, snake.length-eatFoodVar)],
            mainDirection: direction,
            score: score
        }
        if (!eatFoodVar) {
            newState.food = this.createFood(newState.snake);
        }
        this.setState(newState);
    }
    snakeCollision(snake, posX, posY) {
        if (posX === this.board.width || posY === this.board.height || posX < 0 || posY < 0
            || !this.checkCollision(snake, posX, posY)) {
            return true;
        }
    }
    checkCollision (snake, posX, posY) {
        for (let cell of snake) {
            if (cell.posX === posX && cell.posY === posY) {
                return false;
            }
        }
        return true;
    }
    createFood(snake) {
        let posFoodX = 0,
            posFoodY = 0;
        do {
            posFoodX = Math.floor(Math.random() * (this.board.width - this.cellSize + 1) / this.cellSize) * this.cellSize;
            posFoodY = Math.floor(Math.random() * (this.board.height - this.cellSize + 1) / this.cellSize) * this.cellSize;
        } while (!this.checkCollision(snake, posFoodX, posFoodY));
        return {posFoodX, posFoodY};
    }
    resetGame() {
        this.newDirection = 'ArrowRight';
        this.setState({
            snake: [{posX: 90, posY: 30}, {posX: 60, posY: 30}, {posX: 30, posY: 30}, {posX: 0, posY: 30}],
            food: undefined,
            mainDirection: 'ArrowRight',
            start: false,
            gameOver: false,
            score: 0,
        });
    }
    render() {
        let {snake, start, food, mainDirection, score, gameOver} = this.state;
        return (
            <>
                <HeaderBlock/>
                <ScoreBlock score={score}/>
                <Canvas snake={snake} food={food} direction={mainDirection} start={start} gameOver={gameOver}/>
                <Button onClick={start ? undefined : this.startGame}>Start</Button>
                <Button onClick={gameOver ? this.resetGame : undefined}>Reset</Button>
            </>
        )
    }
}