import { useEffect, useState } from "react";
import axios from "./axios";

export default function myFlat() {
    const [flat, setFlat] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // axios.get("/has-flat")
        axios
            .get("/api/my-flats")
            .then(({ data }) => {
                // console.log("data", data);
                setFlat(data[0]);
                // console.log("flat", flat);
            })
            .catch((e) =>
                console.log("error in getting the flat (myflat.js)", e)
            );
    }, []);

    const handleDelete = (e) => {
        axios.post("/delete-flat", flat).then(() => {
            console.log("deleted!");
            setMessage("Your flat was successfully deleted!");
            // location.reload();
        });
    };

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

    console.log("flat", flat);

    return (
        <>
            {flat && (
                <div className="myFlatContainer">
                    {message && <h1>{message}</h1>}

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
                    <span>
                        {" "}
                        from {formatDate(flat.starting)} to{" "}
                        {formatDate(flat.till)}{" "}
                    </span>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            )}

            {!flat && <h3> You dont have any flats 😔</h3>}
        </>
    );
}
