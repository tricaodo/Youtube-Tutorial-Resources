import React from "react";
import idolData from "../json/idols"; // data for training/filtering

// Render all data de xem no ntn.
// Render all idols for data selection.
class Idols extends React.Component {

    state = {
        idolData: []
    }

    componentDidMount() {
        this.setState({ idolData });
    }

    // render idols.
    renderIdols = () => {
        return this.state.idolData.map(idol => {
            return (
                <section className="section" key={idol.idolId}>
                    <div className="columns">
                        <div className="column">
                            <h1 className="title">{idol.idolName}</h1>
                        </div>
                    </div>

                    <div className="columns is-multiline">
                        {this.renderIdolImages(idol.idolId, idol.images)}
                    </div>
                </section>
            )
        })
    }

    // render specific idol images.
    renderIdolImages = (idolId, images) => {
        return images.map((image, imageIdx) => (
            <div className="column is-one-quarter" key={image}>
                <figure className="image is-256x256">
                    <img src={image} alt={image} />
                    <div className="has-text-centered mt-2">
                        <button className="button is-danger is-small" onClick={() => this.handleDeleteImage(idolId, imageIdx)}>Delete {imageIdx}</button>
                    </div>
                </figure>
            </div>
        ))
    }

    // handle delete image
    handleDeleteImage = (idolId, imageIdx) => {
        const idolData = [...this.state.idolData];
        const idol = idolData[idolId];
        const images = idol.images;
        images.splice(imageIdx, 1);
        this.setState({ idolData })
    }

    // generate & download json file.
    generateFile = () => {
        const { idolData } = this.state;
        const jsonFormat = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(idolData))}`;
        return (
            <a href={jsonFormat} download="idols.json">Download</a>
        )
    }

    // train model based on the image data.
    trainModel = () => {

    }

    render() {
        return (
            <div className="mt-6">
                <button onClick={() => this.trainModel()} className="button is-small is-info is-outlined mr-3">Train Models</button>
                {this.generateFile()}
                {this.renderIdols()}
            </div>
        )
    }
}

export default Idols;