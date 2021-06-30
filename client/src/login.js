import { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function Login() {
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");

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
                setErrorMessage("Something went wrong 🤷");
            } else {
                location.reload();
            }
        });
    };

    return (
        <div className="loginContainer">
            <video playsInline autoPlay muted loop>
                <source src="flat2.mp4" type="video/mp4"></source>
            </video>
            <div id="loginFormOverlay">
                <form onSubmit={handleSubmit}>
                    <h1>Please login </h1>
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
                    {errorMessage && <p className="error"> {errorMessage} </p>}
                </form>
            </div>
            <span>
                If you are not a member of our community yet, please register{" "}
                <Link to="/">here </Link>
            </span>
        </div>
    );
}
