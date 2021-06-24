import ReactDOM from "react-dom";
import axios from "axios";
import Welcome from "./welcome";
import App from "./app";

axios.get("/user/id.json").then(function ({ data }) {
    // console.log(data);
    if (!data.userId) {
        ReactDOM.render(<Welcome />, document.querySelector("main"));
    } else {
        ReactDOM.render(<App />, document.querySelector("main"));
    }
});
