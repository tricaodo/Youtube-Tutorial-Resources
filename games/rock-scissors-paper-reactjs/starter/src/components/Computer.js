import React from "react";
import largeRock from "../images/rock-96.png"
class Computer extends React.Component {

    render() {
        const { image } = this.props;
        return (
            <React.Fragment>
                <div className="columns">
                    <div className="column">
                        <h1 className="has-text-danger has-text-centered">Computer</h1>
                    </div>
                </div>

                <div className="columns" style={{ justifyContent: "center" }}>
                    <div className="columns" >
                        <div className="column">
                            <img src={largeRock} />
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Computer;