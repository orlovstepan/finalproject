import FlatPreview from "./flatPreview";
import { BrowserRouter, Route, Link } from "react-router-dom";
import AddFlat from "./addFlat";
import InviteFriend from "./inviteFriend";
import Flat from "./flat";

export default function App() {
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
                <div>
                    <Link to="/add-flat">Add flat</Link>
                </div>
                <div>
                    <Link to="/invite">Invite a friend</Link>
                </div>
                <div>
                    <Link to="/logout">Log out</Link>
                </div>
            </div>
            <hr width="90%"></hr>
            <Route path="/" exact component={FlatPreview} />
            <Route path="/add-flat" component={AddFlat} />
            <Route path="/invite" component={InviteFriend} />
            <Route path="/flats/:id" component={Flat} />
        </BrowserRouter>
    );
}
