import React from "react";
import faceApi from "../apis/faceApi"

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.imageRef = React.createRef();
        this.state = {
            term: "",
            idolName: "",
            isValid: false
        }
    }

    componentDidMount() {
        this.ctx = this.canvasRef.current.getContext("2d");
    }

    handleChange = (e) => {
        const value = e.target.value
        this.setState({ term: value });
    }

    handleSubmit = async () => {
        const { term } = this.state;
        const detectResponse = await this.detectFace(term);
        console.log(detectResponse);
        const faceId = detectResponse.data[0].faceId;
        const shape = detectResponse.data[0].faceRectangle;

        const response = await faceApi.post("identify", {
            personGroupId: "idols",
            faceIds: [
                faceId
            ],
            maxNumOfCandidatesReturned: 1,
        });

        console.log(response)

        // const identifyResponse = await this.recognizeFace(faceId);

        // const targetInfo = identifyResponse.data[0].candidates[0];
        // if (targetInfo) {
        //     const foundIdolInfo = finalData.filter(individual => individual.personId === targetInfo.personId);
        //     this.setState({ idolName: foundIdolInfo[0].name })
        //     this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        //     this.ctx.beginPath(); // begin
        //     this.ctx.drawImage(this.imageRef.current, 0, 0);
        //     this.ctx.rect(shape.left, shape.top, shape.width, shape.height);
        //     this.ctx.closePath(); // begin
        //     this.ctx.strokeStyle = "#FF0000";
        //     this.ctx.stroke();
        // } else {
        //     this.setState({ idolName: "Cannot identify." })
        // }
    }

    // Phat hien khuon mat trong buc anh.
    detectFace = async term => {
        const response = await faceApi.post("detect", { url: term });
        return response;
        // const faceId = detectResponse.data[0].faceId;
        // const shape = detectResponse.data[0].faceRectangle;
    }

    // Nhan dang khuon mat.
    recognizeFace = async faceId => {
        console.log(faceId);
        const response = await faceApi.post("identify", {
            personGroupId: "idols",
            faceIds: [
                faceId
            ],
            maxNumOfCandidatesReturned: 1,
        });
        return response;
    }

    render() {
        const { term } = this.state;
        return (
            <section className="section mt-6" >
                <div className="container mt-5">
                    <div className="field has-addons">
                        <div className="control is-expanded">
                            <input
                                name="url"
                                className="input"
                                type="text"
                                placeholder="Image URL"
                                autoFocus=""
                                value={term}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </div>

                        <div className="control">
                            <button
                                type="submit"
                                className="input button is-primary"
                                onClick={() => this.handleSubmit()}
                            >Search</button>
                        </div>

                        <div className="columns">
                            <figure className="image is-square" style={{ display: "none" }} >
                                <img ref={this.imageRef} src={this.state.term} alt="idol" />
                            </figure>
                            <div className="column">
                                <canvas ref={this.canvasRef} width="600px" height="400px">

                                </canvas>

                            </div>
                        </div>


                    </div>
                </div>
            </section>
        )
    }
}

export default Search;