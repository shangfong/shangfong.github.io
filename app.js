async function loadData() {

    const f1 = await fetch("./data/f1.json").then(r => r.json());
    const f2 = await fetch("./data/f2.json").then(r => r.json());
    const motorsports = await fetch("./data/motorsports.json").then(r => r.json());

    renderHero(f1);

    renderSeries("f1", f1);
    renderSeries("f2", f2);
    renderSeries("motorsports", motorsports);
}

function localTime(time) {
    return new Date(time).toLocaleString();
}

function renderHero(data) {

    const next = data.events[0];

    document.getElementById("nextEvent").innerHTML = `
        <h3>${next.name}</h3>
        <p>${next.location}</p>
        <p>Times shown in your local timezone.</p>
    `;
}

function renderSeries(containerId, data) {

    const container = document.getElementById(containerId);

    container.innerHTML = data.events.map(event => `

        <div class="event-card">

            <img src="${event.trackImage}" alt="${event.track}" />

            <h2>${event.name}</h2>

            <p>${event.location}</p>

            <p>${event.track}</p>

            ${event.sessions.map(session => `
                <div>
                    <strong>${session.name}</strong>
                    -
                    ${localTime(session.time)}
                </div>
            `).join("")}

        </div>

    `).join("");
}

document.addEventListener("click", function(e){

    if(!e.target.classList.contains("tab"))
        return;

    document
        .querySelectorAll(".tab-content")
        .forEach(tab => tab.style.display = "none");

    document.getElementById(
        e.target.dataset.tab
    ).style.display = "block";
});

loadData();
