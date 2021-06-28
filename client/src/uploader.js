import axios from "./axios";
import { useState } from "react";

export default function AddFlat() {
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        setImages(e.target.files);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("images", images);
        axios.post("/upload-images", data);
        console.log("data in submit", data);
        console.log("images after submit", images);
    };

    return (
        <div className="uploaderContainer">
            <form onSubmit={handleSubmit}>
                <input
                    id="imgUploader"
                    name="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                ></input>
                <input name="headline" placeholder="headline"></input>
                <input name="description" placeholder="description"></input>
                <input name="starting" placeholder="starting date"></input>
                <input name="till" placeholder="till"></input>
                <button>Submit</button>
            </form>
        </div>
    );
}
