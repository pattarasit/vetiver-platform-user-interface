import axios from "axios";

var config = null;

export default axios.create({
    baseURL: "http://localhost:1404/vetiver-api",
});


