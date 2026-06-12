const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.get("/", (req, res) => {
    res.send("Bornil TV Server is Running ✔");
});
const M3U_URL = "https://go.skym3u.top/k98v.m3u";

app.get("/playlist", async (req, res) => {
    try {
        const response = await fetch(M3U_URL);
        const data = await response.text();
        res.send(data);
    } catch (err) {
        res.status(500).send("Error");
    }
});

app.listen(3000, () => {
    console.log("Server running");
});
