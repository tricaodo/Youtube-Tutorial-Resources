import React from "react";
import idolData from "../json/idols"; // data for training/filtering
import faceApi from "../apis/faceApi";

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
    trainModel = async () => {
        const groupId = "idols";
        const { idolData } = this.state;
        for (let idol of idolData) {
            // tạo profile cho every idol để lưu trữ hình ảnh
            const response = await faceApi.post(`/persongroups/${groupId}/persons`, { name: idol.idolName, userData: idol.id });
            if(response.status === 200){
                console.log(`======== Create profile for ${idol.idolName} successfully. ========`);
                const images = idol.images;
                for(let i = 0; i < images.length; i++){
                    // insert images vào idol vừa tạo.
                    await this.insertImage(groupId, response.data.personId, images[i]);
                    this.sleep(4 * 1000);
                }
            }
        }
    }

    // submit images cho mỗi idol.
    insertImage = async (groupId, personId, imageUrl) => {
        try{
            await faceApi.post(`/persongroups/${groupId}/persons/${personId}/persistedfaces`, {url: imageUrl})
            console.log("Submit successfully " + imageUrl);
        }catch (error){
            console.error(error);
        }
    }

    // Ngưng 4s mỗi khi submit 1 image.
    sleep = (time) => {
        console.log('Begin Sleep');
        var stop = new Date().getTime();
        while (new Date().getTime() < stop + time) {
            ;
        }
        console.log('End Sleep');
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