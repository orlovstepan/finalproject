import { useState } from "react";
import axios from "./axios";

export default function InviteFriend() {
    const [friend, setFriend] = useState();

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFriend({ ...friend, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/invite", friend).then(({ data }) => {
            if (!data.success) {
                console.log("invitation failed");
            } else {
                // console.log("invite sent");
                setMessage(
                    "We've added your friend to our platform. They now can register 🌸"
                );
            }
        });
    };

    return (
        <div className="inviteFriendContainer">
            <div id="inviteInfo">
                <h3>Help our community grow, invite your friend to join</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        name="email"
                        type="email"
                        placeholder="Your friends' email"
                    ></input>
                    <button>Invite</button>
                    {message && <p className="error"> {message} </p>}
                </form>
            </div>
        </div>
    );
}
