import axios from "./axios";
import { useState } from "react";

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
        console.log("handlesubmit running");
        e.preventDefault();
        const data = new FormData();
        // data.append("images", images);
        for (let i = 0; i < images.length; i++) {
            data.append("images", images[i]);
        }
        for (let key in info) {
            data.append(key, info[key]);
        }
        axios.post("/upload-images", data);
        console.log("data in submit", data);
        console.log("images after submit", images);
    };

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
                placeholder="starting date"
            ></input>
            <input
                onChange={handleChangeInfo}
                name="till"
                placeholder="till"
            ></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
}
