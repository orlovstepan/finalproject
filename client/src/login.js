import { useState } from "react";
import axios from "./axios";

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log("values", values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/login", values).then(({ data }) => {
            console.log("data in login", data);
            if (!data.success) {
                console.log("registration failed");
            } else {
                // location.reload();
            }
        });
    };

    return (
        <div className="loginContainer">
            <form onSubmit={handleSubmit}>
                <h3>Please login </h3>
                <input
                    onChange={handleChange}
                    name={"email"}
                    placeholder={"Email"}
                    required
                    type={"email"}
                ></input>
                <input
                    onChange={handleChange}
                    name={"password"}
                    placeholder={"Password"}
                    required
                    type={"password"}
                ></input>
                <button type={"submit"}>Log in</button>
            </form>
        </div>
    );
}
