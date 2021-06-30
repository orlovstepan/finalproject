import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "./axios";

export default function Flat() {
    const [flat, setFlat] = useState({});

    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/api/flats/${id}`)
            .then(({ data }) => {
                console.log("data", data);
                setFlat(data[0]);
                console.log("flat", flat);
            })
            .catch((e) =>
                console.log("error in getting the flat (flats.js)", e)
            );
    }, []);

    return (
        <div className="flatContainer">
            <h1>{flat.headline}</h1>

            {flat.image_1 && (
                <img height="200px" width="auto" src={flat.image_1} />
            )}
            {flat.image_2 && (
                <img height="200px" width="auto" src={flat.image_2} />
            )}
            {flat.image_3 && (
                <img height="200px" width="auto" src={flat.image_3} />
            )}
            {flat.image_4 && (
                <img height="200px" width="auto" src={flat.image_4} />
            )}
            {flat.image_5 && (
                <img height="200px" width="auto" src={flat.image_5} />
            )}

            <span>{flat.description}</span>
            <span> from date to date </span>
        </div>
    );
}
