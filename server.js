const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const M3U_URL = "https://go.skym3u.top/k98v.m3u";

// IPTV UI Home Page
app.get("/", async (req, res) => {
    try {
        const response = await fetch(M3U_URL);
        const m3u = await response.text();

        res.send(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bornil IPTV</title>
<style>
body {
    margin:0;
    font-family:Arial;
    background:#111;
    color:#fff;
}

header {
    background:#000;
    padding:15px;
    text-align:center;
    font-size:20px;
    font-weight:bold;
}

video {
    width:100%;
    max-width:800px;
    display:block;
    margin:10px auto;
    background:#000;
}

.channel {
    padding:12px;
    border-bottom:1px solid #333;
    cursor:pointer;
    max-width:800px;
    margin:auto;
}

.channel:hover {
    background:#222;
}
</style>
</head>

<body>

<header>📺 Bornil IPTV</header>

<video id="player" controls></video>
<div id="list"></div>

<script>
const m3u = \`${m3u.replace(/`/g, "")}\`;

const lines = m3u.split("\\n");
let channels = [];

for(let i=0;i<lines.length;i++){
    if(lines[i].startsWith("#EXTINF")){
        let name = lines[i].split(",")[1];
        let url = lines[i+1];

        if(url && url.startsWith("http")){
            channels.push({name,url});
        }
    }
}

const list = document.getElementById("list");
const player = document.getElementById("player");

channels.forEach(ch=>{
    let div = document.createElement("div");
    div.className = "channel";
    div.innerText = ch.name;

    div.onclick = ()=>{
        player.src = ch.url;
        player.play();
    }

    list.appendChild(div);
});
</script>

</body>
</html>
        `);

    } catch (err) {
        res.send("❌ IPTV load failed");
    }
});

// Raw playlist API
app.get("/playlist", async (req, res) => {
    try {
        const response = await fetch(M3U_URL);
        const data = await response.text();
        res.send(data);
    } catch (err) {
        res.status(500).send("Error loading playlist");
    }
});

// Server start
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on port " + PORT);
});
