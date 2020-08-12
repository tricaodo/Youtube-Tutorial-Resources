import axios from "axios";

export default axios.create({
    baseURL: "https://idolsearchdemo.cognitiveservices.azure.com/bing/v7.0/images/",
    headers: { "Ocp-Apim-Subscription-Key": "a1c0c9824ef6404796249ed86a7d6371" }
})