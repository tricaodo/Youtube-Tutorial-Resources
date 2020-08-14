import React from "react";
import bingApi from "../apis/bingApi";
const idolNames = [
    "Ngọc Trinh",
    "Bà Tưng",
    "Hường Hana",
    "Hoàng Thùy Linh",
    "Elly Trần",
    "Thuỷ Top",
    "Tâm Tít",
    "Diệp Lâm Anh",
    "Miu Lê",
    "YaYa Trương Nhi",
    "Khả Ngân",
    "Angela Phương Trinh"
]

// call Bing API to fetch idols images.
export const bingApiCalled = async () => {
    let idolInfos = [];
    let id = 0;
    for (let idolName of idolNames) {
        const response = await bingApi.get("search", {
            params: {
                q: idolName
            }
        })
        // filter data and construct idol info.
        const idolInfo = filterResponse(id, idolName, response.data)
        idolInfos.push(idolInfo);
        id++;
    }
    return idolInfos;
}

// filter data and construct idol info.
const filterResponse = (idolId, idolName, data) => {
    let images = [];
    for (let info of data.value) {
        images.push(info.thumbnailUrl);
    }
    return { idolId, idolName, images };
}

// generate & download json file.
export const generateFile = idolInfos => {
    const jsonFormat = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(idolInfos))}`;
    return (
        <a href={jsonFormat} download="idols.json">Download</a>
    )
}