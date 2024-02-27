import express from "express";
import ejs from "ejs";

let configViewEngine = (app) => {
    app.use("/public", express.static("./src/public"));
    app.set("view engine", "ejs");
    app.set("views", "./src/views");
}

module.exports = configViewEngine;
