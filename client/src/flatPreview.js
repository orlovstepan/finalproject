import { useEffect, useState } from "react";
import axios from "./axios";

export default function FlatPreview() {
    const [flats, setFlats] = useState([]);

    useEffect(() => {
        axios
            .get("/api/flat-preview")
            .then(({ data }) => {
                console.log("data in FlatPreview", data);
                setFlats(data);
            })
            .catch((e) => console.log("error in usEffect flatpreview", e));
    }, []);

    return (
        <div className="flatsPreviewContainer">
            <ul>
                {flats.map((each) => (
                    <li key={each.id}>
                        {each.renter} rents out {each.headline} <br></br>
                        <img id="flatPicLi" src={each.image_1} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
