import "./App.css";
import React, { useState } from "react";
import Test from "./components/Test";
import Main from "./components/Main";
import loading from "./Ball-1s-200px.gif"
function App() {
    const [data, setData] = React.useState(false);
    const [link, setLink] = React.useState();
    const [id, setId] = React.useState(false);
    const [errorMessege, setErrorMessage] = useState();
    const [loader,setLoader] = useState(false)
    const [submited,setSubmited] = useState(false)
    let check = false;
    function youtube_parser(url) {
        let regExp =
            /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        let match = url.match(regExp);
        return match && match[7].length == 11 ? match[7] : false;
    }
    function handleChange(event) {
        setLink(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        setData(false)
        setErrorMessage(null)
        setId(link ? youtube_parser(link) : undefined);
        setSubmited(prevSubmited => !prevSubmited)
    }
    async function getData() {
        if (id) {
            const url = `https://youtube-audio-video-download.p.rapidapi.com/geturl?video_url=https%3A%2F%2Fyoutu.be%2F${id}`;
            // `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${id}`;
            const options = {
                method: "GET",
                headers: {
                    "X-RapidAPI-Key":
                        "e6529b7cc3msh005271649110848p16dc29jsnf47d0c9612e3",
                    "X-RapidAPI-Host":
                        "youtube-audio-video-download.p.rapidapi.com",
                    // "ytstream-download-youtube-videos.p.rapidapi.com",
                },
            };

            try {
                setLoader(true)
                const response = await fetch(url, options);
                const result = await response.json();
                setLoader(false)
                setData(result);
                console.log(data)
            } catch (error) {
                setLoader(false)
                setErrorMessage(() => {
                    return (
                        <p className="error-messege">
                            some error has occured please recheck the link or your internet acsses  {" "}
                        </p>
                    );
                });
                console.error(error);
            }
        }
    }
    React.useEffect(() => {
        getData();
        console.log(data);
    }, [submited]);
    check = data && data.message === undefined;
    console.log(data);
    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="video link"
                    name="url"
                    onChange={handleChange}
                    value={link}
                ></input>
                <button>Download</button>
            </form>
            {/* <Test /> */}
            {loader ? <img src={loading} alt="loading..." className="loading"/>:undefined}
            {check ? <Main data={data} id={id} /> : errorMessege}
            <p className="rights">
                © 2023 Mohamed Abderalzek. All rights reserved.
            </p>
        </div>
    );
}

export default App;
