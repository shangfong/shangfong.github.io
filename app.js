async function loadData() {

```
try {

    const f1 =
        await fetch("./data/f1.json")
        .then(r => r.json());

    const f2 =
        await fetch("./data/f2.json")
        .then(r => r.json());

    const motorsports =
        await fetch("./data/motorsports.json")
        .then(r => r.json());

    renderHero(f1);

    renderSeries("f1", f1);
    renderSeries("f2", f2);
    renderSeries("motorsports", motorsports);

} catch (error) {

    console.error(error);

    document.getElementById("nextEvent").innerHTML =
        "Error loading schedule data.";
}
```

}

function localTime(time) {

```
return new Date(time).toLocaleString();
```

}

function getNextSession(event) {

```
const now = new Date();

return event.sessions.find(
    session => new Date(session.time) > now
);
```

}

function startCountdown(session) {

```
const countdown =
    document.getElementById("countdown");

function update() {

    const diff =
        new Date(session.time) - new Date();

    if (diff <= 0) {

        countdown.innerHTML =
            "🏁 Session Started";

        return;
    }

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (diff % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (diff % (1000 * 60 * 60))
            / (1000 * 60)
        );

    const seconds =
        Math.floor(
            (diff % (1000 * 60))
            / 1000
        );

    countdown.innerHTML = `
        <p><strong>${session.name}</strong></p>

        <div class="countdown-grid">

            <div>
                <strong>${days}</strong>
                Days
            </div>

            <div>
                <strong>${hours}</strong>
                Hours
            </div>

            <div>
                <strong>${minutes}</strong>
                Minutes
            </div>

            <div>
                <strong>${seconds}</strong>
                Seconds
            </div>

        </div>
    `;
}

update();

setInterval(update, 1000);
```

}

function renderHero(data) {

```
const event = data.events[0];

const nextSession =
    getNextSession(event);

document.getElementById("nextEvent").innerHTML = `
    <h3>${event.name}</h3>
    <p>${event.location}</p>
    <p>Times automatically converted to your local timezone.</p>
`;

if (nextSession) {
    startCountdown(nextSession);
}
```

}

function renderSeries(containerId, data) {

```
const container =
    document.getElementById(containerId);

container.innerHTML =
    data.events.map(event => `

        <div class="event-card">

            <img
                src="${event.trackImage}"
                alt="${event.track}"
            >

            <h2>${event.name}</h2>

            <p>${event.location}</p>

            <p>${event.track}</p>

            ${event.sessions.map(session => `

                <div class="session">

                    <strong>
                        ${session.name}
                    </strong>

                    <br>

                    ${localTime(session.time)}

                </div>

            `).join("")}

        </div>

    `).join("");
```

}

document.addEventListener("DOMContentLoaded", () => {

```
document.querySelectorAll(".tab")
    .forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll(".tab")
                .forEach(tab =>
                    tab.classList.remove("active"));

            document
                .querySelectorAll(".tab-content")
                .forEach(content =>
                    content.classList.remove("active"));

            button.classList.add("active");

            document
                .getElementById(button.dataset.tab)
                .classList.add("active");

        });

    });

loadData();
```

});
