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

    const formatDate = (date) => {
        // if (!date) {
        //     return;
        // }
        console.log("date before", date);
        date = new Date(date);
        const prettyDate = new Intl.DateTimeFormat("en-GB").format(date);
        console.log(prettyDate);
        return prettyDate;
    };

    return (
        <div className="flatsPreviewContainer">
            <ul>
                {flats.map((each) => (
                    <li id="flatCard" key={each.id}>
                        <Link to={`/flats/${each.id}`}>
                            <h5>
                                {" "}
                                {each.first} rents out {each.headline}{" "}
                            </h5>
                            <br></br>
                            <img id="flatPicLi" src={each.image_1} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
