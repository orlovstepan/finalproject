import { useState } from "react";
import axios from "./axios";

export default function InviteFriend() {
    const [friend, setFriend] = useState();

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
                location.reload();
            }
        });
    };

    return (
        <div className="inviteFriendContainer">
            <h1>Help our community grow, invite your friend to join</h1>
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    name="email"
                    type="email"
                    placeholder="Your friends' email"
                ></input>
                <button>Send an invitation</button>
            </form>
        </div>
    );
}
