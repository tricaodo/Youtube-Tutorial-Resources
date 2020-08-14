import React from "react";
import smallHand from "../images/hand-48.png"
import smallRock from "../images/rock-48.png"
import smallScissors from "../images/scissor-48.png"

import largeScissors from "../images/scissor-96.png"
class Player extends React.Component {

    handleOnClick = e => {
        const pick = parseInt(e.target.alt);
        this.props.handlePick(pick);
    }

    render() {
        const { image } = this.props;

        return (
            <React.Fragment>
                <div className="columns" style={{ justifyContent: "center" }}>
                    <div className="columns" >
                        <div className="column">
                            {
                                image !== undefined
                                ? <img src={image} />
                                : ""
                            }
                        </div>
                    </div>
                </div>

                <div className="columns" style={{ justifyContent: "center" }}>
                    <div className="columns" >
                        <div className="column">
                            <figure className="image">
                                <img src={smallHand} alt="0" onClick={(e) => {this.handleOnClick(e)}} />
                            </figure>
                        </div>

                        <div className="column">
                            <figure className="image">
                                <img src={smallScissors} alt="1"  onClick={(e) => {this.handleOnClick(e)}}  />
                            </figure>
                        </div>

                        <div className="column">
                            <figure className="image">
                                <img src={smallRock} alt="2"  onClick={(e) => {this.handleOnClick(e)}}  />
                            </figure>
                        </div>
                    </div>
                </div>

                <div className="columns">
                    <div className="column">
                        <h1 className="has-text-primary has-text-centered">Player</h1>
                    </div>
                </div>

            </React.Fragment >
        )
    }
}

export default Player;