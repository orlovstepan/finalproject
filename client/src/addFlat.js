import axios from "./axios";
import { useState, useEffect } from "react";

export default function AddFlat() {
    const [images, setImages] = useState([]);

    const [info, setInfo] = useState({});

    const handleChange = (e) => {
        setImages(e.target.files);
    };

    const handleChangeInfo = (e) => {
        setInfo({ ...info, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        // data.append("images", images);
        for (let i = 0; i < images.length; i++) {
            data.append("images", images[i]);
        }
        for (let key in info) {
            data.append(key, info[key]);
        }
        axios.post("/upload-images", data).then(() => {
            window.location.href = "/my-flats";
        });
        console.log("data in submit", data);
        console.log("images after submit", images);
    };

    useEffect(() => {
        axios.get("/has-flat").then(({ data }) => {
            console.log("data hasflats", data);
            if (data.length) {
                window.location.href = "/my-flats";
            }
        });
    }, []);

    return (
        <div className="uploaderContainer">
            <h1>Share your flat here</h1>
            <br></br>
            <div id="uploaderFields">
                <input
                    id="headline"
                    onChange={handleChangeInfo}
                    name="headline"
                    placeholder="headline"
                ></input>
                <textarea
                    id="description"
                    onChange={handleChangeInfo}
                    name="description"
                    placeholder="description"
                ></textarea>
                <label htmlFor="starting">From</label>
                <input
                    onChange={handleChangeInfo}
                    name="starting"
                    type="date"
                    placeholder="starting date"
                ></input>
                <label htmlFor="starting">Till</label>
                <input
                    onChange={handleChangeInfo}
                    name="till"
                    type="date"
                    placeholder="till"
                ></input>
                <label id="imgLabel" htmlFor="imgUploader">
                    Select Images
                </label>
                <input
                    style={{ visibility: "hidden" }}
                    id="imgUploader"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                ></input>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}
