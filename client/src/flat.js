import { useState } from "react";
import axios from "./axios";

export default function Flat() {
    return (
        <div className="flatContainer">
            <h1>headline</h1>
            <ul>
                <li>image 1</li>
                <li>image 2</li>
                <li>image 3</li>
                <li>image 4</li>
            </ul>
            <span>
                description here description heredescription heredescription
                here description here description here description here
                description here description here description here description
                here description here
            </span>
            <span> from date to date </span>
        </div>
    );
}
