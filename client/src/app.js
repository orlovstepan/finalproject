import FlatPreview from "./flatPreview";
import { BrowserRouter, Route, Link } from "react-router-dom";

export default function App() {
    return (
        <BrowserRouter>
            <div className="upperBanner">
                <img id="logo" src="../public/logo.png" alt="logo" />
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
            <div className="feed">
                <FlatPreview />
            </div>
        </BrowserRouter>
    );
}
