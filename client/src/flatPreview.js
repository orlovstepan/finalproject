import { useEffect, useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

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
                        <Link to={`/flats/${each.id}`}>
                            {each.first} rents out {each.headline} <br></br>
                            <img id="flatPicLi" src={each.image_1} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
