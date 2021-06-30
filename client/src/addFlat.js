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
            <input
                id="imgUploader"
                name="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
            ></input>
            <input
                onChange={handleChangeInfo}
                name="headline"
                placeholder="headline"
            ></input>
            <input
                onChange={handleChangeInfo}
                name="description"
                placeholder="description"
            ></input>
            <input
                onChange={handleChangeInfo}
                name="starting"
                type="date"
                placeholder="starting date"
            ></input>
            <input
                onChange={handleChangeInfo}
                name="till"
                type="date"
                placeholder="till"
            ></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
