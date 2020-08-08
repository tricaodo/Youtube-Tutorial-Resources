import React from "react";

import img1 from "./images/01.png";
import img2 from "./images/02.png";
import img3 from "./images/03.png";
import img4 from "./images/04.png";
import img5 from "./images/05.png";
import img6 from "./images/06.png";
import img7 from "./images/07.png";
import img8 from "./images/08.png";
import { randomWord } from "./words";

class Hangman extends React.Component {
    static defaultProps = {
        images: [img1, img2, img3, img4, img5, img6, img7, img8],
        maxGuess: 7
    }

    constructor() {
        super();
        this.state = {
            answer: randomWord().toUpperCase(), // random pick a word.
            guessed: new Set(), // keep track the gussed word.
            numWrong: 0
        }
    }

    resetGame = () => {
        this.setState({
            answer: randomWord().toUpperCase(), // random pick a word.
            guessed: new Set(), // keep track the gussed word.
            numWrong: 0
        })
    }

    // Generate the buttons.
    generateButtons = () => {
        let letters = "abcdefghijklmnopqrstuvwxyz";
        letters = letters.toUpperCase().split("");
        return letters.map(letter => (
            <button
                key={letter}
                value={letter}
                onClick={(e) => this.handleClick(e)}
                disabled={this.state.guessed.has(letter)}>{letter}</button> // disable if button is already clicked.
        ))
    }

    handleClick = (e) => {
        const guessedLetter = e.target.value;
        this.setState(oldState => (
            {
                guessed: oldState.guessed.add(guessedLetter),
                numWrong: oldState.numWrong + (oldState.answer.includes(guessedLetter) ? 0 : 1)
            }
        ))
    }

    guessedWord = () => {
        console.log(this.state);
        return this.state.answer
            .split("")
            .map(letter => this.state.guessed.has(letter) ? letter : "_")
    }

    render() {

        const { answer, numWrong } = this.state;
        const isWon = answer === this.guessedWord().join("");
        const isGameOver = numWrong >= this.props.maxGuess;
        let text = "";
        if (isWon) text = "You Win";
        if (isGameOver) text = "You Lose"
        
        return (
            <div className="container">
                <h1>Hangman Game</h1>
                <img src={this.props.images[numWrong]}></img>
                <p className="Hangman-word">{isGameOver ? answer : this.guessedWord()}</p>
                <p className={`result ${isWon ? "win" : ""} ${isGameOver ? "lose" : ""}`}>
                    {text}
                </p>
                <p className='Hangman-btns'>
                    <div hidden={isGameOver || isWon}>
                        {this.generateButtons()}
                    </div>
                    <button className="reset" onClick={() => this.resetGame()}>Reset Game</button>
                </p>
            </div>
        )
    }
}

export default Hangman;