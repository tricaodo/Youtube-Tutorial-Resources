import React from "react";
import largeHand from "../images/hand-96.png"
import largeScissors from "../images/scissor-96.png"
import largeRock from "../images/rock-96.png"

import Computer from "./Computer";
import Player from './Player';

class Game extends React.Component {

    static defaultProps = {
        // bao            keo              bua
        images: [largeHand, largeScissors, largeRock]
    }

    state = {
        playerScore: 0,
        enemyScore: 0,
        playerPick: undefined,
        randomPick: undefined
    }

    handlePick = playerPick => {
        this.setState({ playerPick }, () => {
            this.randomGenerate();
        })
    }

    randomGenerate = () => {
        const randomPick = Math.floor(Math.random() * this.props.images.length);
        this.setState({ randomPick }, () => {
            this.checkWhoWin();
        })
    }

    checkWhoWin = () => {
        let { playerPick, randomPick, playerScore, enemyScore } = this.state;
        if (playerPick === randomPick) {
            // hoa`
        } else {
            if (playerPick === 0) {
                if (randomPick === 2) {
                    playerScore++;
                } else if (randomPick === 1) {
                    enemyScore++;
                }
            } else if (playerPick === 1) {
                if (randomPick === 0) {
                    playerScore++;
                } else if (randomPick === 2) {
                    enemyScore++;
                }
            } else if (playerPick === 2) {
                if (randomPick === 1) {
                    playerScore++;
                } else if (randomPick === 0) {
                    enemyScore++;
                }
            }
        }
        this.setState({ playerScore, enemyScore });
    }

    render() {
        const { randomPick, playerPick, playerScore, enemyScore } = this.state;
        const { images } = this.props;
        return (
            <React.Fragment>
                <section className="section">
                    <Computer image={images[randomPick]} />
                </section>
                <section className="section">
                    <h1 className="title has-text-primary has-text-centered">Player: {playerScore} - <span className="has-text-danger">Computer: {enemyScore}</span></h1>
                </section>
                <section className="section">
                    <Player image={images[playerPick]} handlePick={this.handlePick} />
                </section>
            </React.Fragment>
        )
    }
}

export default Game;