fetch("/api/channels")
.then(res => res.json())
.then(data => {
    const container = document.getElementById("channels");

    data.forEach(channel => {
        let div = document.createElement("div");
        div.className = "channel";
        div.innerHTML = `
            <img src="${channel.logo}" width="100%">
            <p>${channel.name}</p>
        `;

        div.onclick = () => {
            document.getElementById("videoPlayer").src = channel.stream_url;
        };

        container.appendChild(div);
    });
});
