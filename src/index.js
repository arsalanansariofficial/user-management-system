import Controller from "./screens/Controller";
import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import store from "./store/store";

// Created By Arsalan Ansari

ReactDOM.render(
    <Provider store={store}>
        <Controller/>
    </Provider>,
    document.getElementById("root")
);
