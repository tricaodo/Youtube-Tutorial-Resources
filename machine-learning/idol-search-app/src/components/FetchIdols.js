import React from "react";
import { generateFile, bingApiCalled } from "../collections/fetchIdols";

class FetchIdols extends React.Component {
    state = { idolInfos: undefined };
    async componentDidMount() {
        const idolInfos = await bingApiCalled();
        this.setState({ idolInfos })
    }
    render() {
        if (this.state.idolInfos) {
            const downLoadLink = generateFile(this.state.idolInfos);
            return (
                downLoadLink
            )
        }
        return null;
    }
}

export default FetchIdols;