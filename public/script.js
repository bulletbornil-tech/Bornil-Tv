let channels = [];

fetch("channels.json")
  .then(res => res.json())
  .then(data => {
    channels = data;
    renderCategories();
    renderChannels(channels);
  });

function renderCategories() {
  const cats = [...new Set(channels.map(c => c.category))];
  const box = document.getElementById("categories");

  cats.forEach(cat => {
    const btn = document.createElement("button");
    btn.innerText = cat;

    btn.onclick = () => {
      renderChannels(channels.filter(c => c.category === cat));
    };

    box.appendChild(btn);
  });
}

function renderChannels(list) {
  const div = document.getElementById("channelList");
  div.innerHTML = "";

  list.forEach(ch => {
    const el = document.createElement("div");
    el.className = "channel";

    el.innerHTML = `
      <img src="${ch.logo}">
      <p>${ch.name}</p>
    `;

    el.onclick = () => playStream(ch.stream_url);
    div.appendChild(el);
  });
}

/* 🔥 FIXED HLS PLAYER */
function playStream(url) {
  const video = document.getElementById("videoPlayer");

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
    });
  } else {
    video.src = url;
    video.play();
  }
}

/* SEARCH */
document.addEventListener("input", e => {
  if (e.target.id === "search") {
    const val = e.target.value.toLowerCase();
    renderChannels(channels.filter(c => c.name.toLowerCase().includes(val)));
  }
});
