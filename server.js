const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());

const M3U_URL = "https://go.skym3u.top/k98v.m3u";

app.get("/", async (req, res) => {
    try {
        const response = await fetch(M3U_URL);
        const data = await response.text();

        res.send(`
        <html>
        <head>
            <title>Bornil TV</title>
            <style>
                body { font-family: Arial; background:#111; color:white; }
                .channel { padding:10px; border-bottom:1px solid #333; cursor:pointer; }
                .channel:hover { background:#222; }
                video { width:100%; max-width:800px; margin-bottom:20px; }
            </style>
        </head>
        <body>

        <h2>📺 Bornil TV Channels</h2>
        <video id="player" controls></video>
        <div id="list"></div>

        <script>
        const m3u = \`${data.replace(/`/g, "")}\`;

        const lines = m3u.split("\\n");
        let channels = [];

        for(let i=0;i<lines.length;i++){
            if(lines[i].startsWith("#EXTINF")){
                let name = lines[i].split(",")[1];
                let url = lines[i+1];
                if(url && url.startsWith("http")){
                    channels.push({name, url});
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
        res.send("Failed to load playlist");
    }
});

app.get("/playlist", async (req, res) => {
    const response = await fetch(M3U_URL);
    const data = await response.text();
    res.send(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
    console.log("Server running on " + PORT);
});
