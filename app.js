async function loadData() {
try {
const f1 = await fetch("./data/f1.json").then(response => response.json());
const f2 = await fetch("./data/f2.json").then(response => response.json());
const motorsports = await fetch("./data/motorsports.json").then(response => response.json());

```
    renderHero(f1);

    renderSeries("f1", f1);
    renderSeries("f2", f2);
    renderSeries("motorsports", motorsports);

} catch (error) {
    console.error("Loading Error:", error);

    const nextEvent = document.getElementById("nextEvent");

    if (nextEvent) {
        nextEvent.innerHTML = `
            <h3>Error Loading Data</h3>
            <p>Check your JSON files inside the data folder.</p>
        `;
    }
}
```

}

function localTime(time) {
return new Date(time).toLocaleString();
}

function getNextSession(event) {
const now = new Date();

```
for (const session of event.sessions) {
    if (new Date(session.time) > now) {
        return session;
    }
}

return null;
```

}

function startCountdown(session) {

```
const countdown = document.getElementById("countdown");

if (!countdown) {
    return;
}

function updateCountdown() {

    const now = new Date();
    const target = new Date(session.time);

    const difference = target - now;

    if (difference <= 0) {
        countdown.innerHTML = "🏁 Session Started";
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (difference % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds = Math.floor(
        (difference % (1000 * 60))
        / 1000
    );

    countdown.innerHTML = `
        <p><strong>${session.name}</strong></p>

        <div class="countdown-grid">

            <div>
                <strong>${days}</strong>
                <div>Days</div>
            </div>

            <div>
                <strong>${hours}</strong>
                <div>Hours</div>
            </div>

            <div>
                <strong>${minutes}</strong>
                <div>Minutes</div>
            </div>

            <div>
                <strong>${seconds}</strong>
                <div>Seconds</div>
            </div>

        </div>
    `;
}

updateCountdown();

setInterval(updateCountdown, 1000);
```

}

function renderHero(data) {

```
const event = data.events[0];

document.getElementById("nextEvent").innerHTML = `
    <h3>${event.name}</h3>
    <p>${event.location}</p>
    <p>Times shown in your local timezone.</p>
`;

const nextSession = getNextSession(event);

if (nextSession) {
    startCountdown(nextSession);
}
```

}

function renderSeries(containerId, data) {

```
const container = document.getElementById(containerId);

container.innerHTML = data.events.map(event => `

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

                <strong>${session.name}</strong>

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
const buttons =
    document.querySelectorAll(".tab");

buttons.forEach(button => {

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
