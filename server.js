const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

// Home route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// M3U URL
const M3U_URL = "https://go.skym3u.top/k98v.m3u";

// Playlist API
app.get("/playlist", async (req, res) => {
    try {
        const response = await fetch(M3U_URL);
        const data = await response.text();
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send("Failed to load playlist");
    }
});

// Port setup for Render
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});
