/*********************************************************************************
*  WEB422 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: _________Travis Liu_____________ Student ID: ______156740201________ Date: _________14 January, 2023_______
*  Cyclic Link: ________________________https://real-rose-cobra-sock.cyclic.app/_______________________________________
*
********************************************************************************/


const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const MoviesDB = require("./modules/moviesDB.js");
const db = new MoviesDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {

    res.json({ message: "API Listening" });

});

app.post("/api/movies", (req, res) => {

    db.addNewMovie(req.body)
        .then(data => res.status(201).json(data))
        .catch((err) => {
            res.status(500).json(err);
        });

});

app.get("/api/movies", (req, res) => {

    let page = req.query.page ? req.query.page : 0;
    let perPage = req.query.perPage ? req.query.perPage : 0;
    let title = req.query.title;
    db.getAllMovies(page, perPage, title)
        .then(data => res.json(data))
        .catch((err) => {
            res.status(500).json(err);
        });

});

app.get("/api/movies/:id", (req, res) => {

    db.getMovieById(req.params.id)
        .then((movie) => {
            movie ? res.json(movie) : res.status(404).json({ "message": "Resource not found" });
        })
        .catch((err) => {
            res.status(500).json({ "message": "Server internal error" });
        });

});

app.put("/api/movies/:id", (req, res) => {

    if (req.body.id && req.params.id != req.body.id) {
        res.status(400).json({ "message": "IDs not match" });
    }
    else {
        db.updateMovieById(req.body, req.params.id).then(() => { res.json({ "message": "the object updated" }) })
            .catch((err) => {
                res.status(500).json({ "message": "Server internal error" });
            });
    }

});

app.delete("/api/movies/:id", (req, res) => {

    db.deleteMovieById(req.params.id).then(() => { res.json() }).catch((err) => {
        res.status(500).json({ "message": "Server internal error" });
    });
    res.status(204).end();

});

db.initialize(process.env.MONGODB_CONN_STRING).then(() => {
    app.listen(HTTP_PORT, () => {
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err) => {
    console.log(err);
});