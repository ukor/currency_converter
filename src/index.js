import React from "react";
import ReactDom from "react-dom";
import App from "./components/App";
import "./custom.css";
import "./w3.css";
import service_worker from "./service_worker/index.js"

ReactDom.render(<App />, document.getElementById("app"));

/** register service worker */
service_worker.register();