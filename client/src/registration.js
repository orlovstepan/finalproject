import { useState } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default function Registration() {
    const [values, setValues] = useState({
        first: "",
        last: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
        // console.log("values", values);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("values before axios", values);
        axios.post("/register", values).then(({ data }) => {
            if (!data.success) {
                console.log("registration failed");
            } else {
                location.reload();
            }
        });
    };

    return (
        <div className="registrationContainer">
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    value={values.first}
                    name={"first"}
                    placeholder={"First Name"}
                    required
                ></input>
                <input
                    onChange={handleChange}
                    value={values.last}
                    name={"last"}
                    placeholder={"Last Name"}
                    required
                ></input>
                <input
                    onChange={handleChange}
                    value={values.email}
                    name={"email"}
                    placeholder={"Email"}
                    required
                    type={"email"}
                ></input>
                <input
                    onChange={handleChange}
                    value={values.password}
                    name={"password"}
                    placeholder={"Password"}
                    required
                    type={"password"}
                ></input>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
}
