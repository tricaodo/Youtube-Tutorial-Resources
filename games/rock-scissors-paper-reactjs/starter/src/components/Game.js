import React from "react";
import largeHand from "../images/hand-96.png"
import largeScissors from "../images/scissor-96.png"
import largeRock from "../images/rock-96.png"

import Computer from "./Computer";
import Player from './Player';

class Game extends React.Component {
    render() {
        return (
            <React.Fragment>
                <section className="section">
                    <Computer />
                </section>
                <section className="section">
                    <h1 className="title has-text-primary has-text-centered">Player: 0 - <span className="has-text-danger">Computer: 0</span></h1>
                </section>
                <section className="section">
                    <Player />
                </section>
            </React.Fragment>
        )
    }
}

export default Game;