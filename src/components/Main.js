import React from "react";
import styles from "./Main.css";
function Main(props) {
    const data = props.data;
    const qualities = data.formats;
    console.log(data);
    let download = [];
    let sortedDownload = []
    for (let i = 0; i < qualities.length; i++) {
        // if (qualities[i].qualityLabel) {
        //     if (qualities[i].mimeType.includes(`video/mp4`)) {
        //         download.push(qualities[i]);
        //     }
        // } else {
        //     if (qualities[i].audioQuality.includes("audio/mp4")) {
        //         download.push(qualities[i]);
        //     }
        // }
        if(qualities[i].audio_channels === 2 && qualities[i].ext === "mp4"){
            download.push(qualities[i]);
            sortedDownload.push(qualities[i]);
        }
        else if(qualities[i].audio_channels === 2 && qualities[i].ext === "m4a" && qualities[i].fps ===null){
            download.push(qualities[i]);
        }
    }
    for (let i = 0; i < qualities.length; i++) {
        if(qualities[i].ext === "m4a"){
            sortedDownload.push(qualities[i]);
        }
    }
    const downloadHtml = sortedDownload.map((item) => {
        return (
            <a href={item.url}>
                {item.ext === "mp4"
                    ? `${item.ext} ${item.format_note}`
                    : `Audio ${item.format_note}`}
            </a>
        );
    });
    console.log(data);
    console.log(download);
    console.log(props.id);
    return (
        <div className="main">
            <h1>{data.title}</h1>
            <iframe
                width="420"
                height="315"
                src={"https://www.youtube.com/embed/" + props.id}
                frameborder="0"
                allowfullscreen
            ></iframe>
            <div className="links">{downloadHtml}</div>
        </div>
    );
}
//(props.link).replace("watch?v=","embed/")
export default Main;
