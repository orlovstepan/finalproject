import FlatPreview from "./flatPreview";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from "./axios";
import { useState, useEffect } from "react";
import AddFlat from "./addFlat";
import InviteFriend from "./inviteFriend";
import Flat from "./flat";
import myFlat from "./myFlat";

export default function App() {
    const [show, setShow] = useState();
    useEffect(() => {
        axios.get("/has-flat").then(({ data }) => {
            console.log("data hasflats", data);
            if (data.length) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
    }, []);
    return (
        <BrowserRouter>
            <div className="upperBanner">
                <img
                    id="logo"
                    src="/logo.png"
                    width="50px"
                    height="50px"
                    alt="logo"
                />
                <div>
                    <Link to="/">Feed</Link>
                </div>
                {!show && (
                    <div>
                        <Link to="/add-flat">Add flat</Link>
                    </div>
                )}
                {show && (
                    <div>
                        <Link to="/my-flats">My flat</Link>
                    </div>
                )}
                <div>
                    <Link to="/invite">Invite a friend</Link>
                </div>
                <a href="logout">Log out</a>
            </div>
            <hr width="90%"></hr>
            <Route path="/" exact component={FlatPreview} />
            <Route path="/add-flat" component={AddFlat} />
            <Route path="/invite" component={InviteFriend} />
            <Route path="/flats/:id" component={Flat} />
            <Route path="/my-flats" component={myFlat} />
        </BrowserRouter>
    );
}
