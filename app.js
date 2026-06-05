let countdownInterval;

async function loadData() {

```
try {

    const f1 = await fetch("./data/f1.json")
        .then(response => response.json());

    const f2 = await fetch("./data/f2.json")
        .then(response => response.json());

    const motorsports = await fetch("./data/motorsports.json")
        .then(response => response.json());

    renderHero(f1);

    renderSeries("f1", f1);
    renderSeries("f2", f2);
    renderSeries("motorsports", motorsports);

} catch (error) {

    console.error(error);

    document.getElementById("nextEvent").innerHTML =
        "Failed to load schedule data.";
}
```

}

function renderHero(data) {

```
const event = data.events[0];

document.getElementById("nextEvent").innerHTML = `
    <h3>${event.name}</h3>
    <p>${event.location}</p>
    <p>Times displayed in your local timezone.</p>
`;

startCountdown(event.sessions[0].time);
```

}

function startCountdown(targetTime) {

```
clearInterval(countdownInterval);

function updateCountdown() {

    const now = new Date();
    const target = new Date(targetTime);

    const diff = target - now;

    if (diff <= 0) {

        document.getElementById("countdown")
            .innerHTML = "🏁 Event Started";

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

    document.getElementById("countdown")
        .innerHTML =
        `⏳ ${days}d ${hours}h ${minutes}m`;
}

updateCountdown();

countdownInterval =
    setInterval(updateCountdown, 1000);
```

}

function localTime(time) {

```
return new Date(time)
    .toLocaleString();
```

}

function renderSeries(containerId, data) {

```
const container =
    document.getElementById(containerId);

container.innerHTML =
    data.events.map(event => `

        <div class="event-card">

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

document.addEventListener(
"DOMContentLoaded",
() => {

```
    document
        .querySelectorAll(".tab")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

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
                }
            );
        });

    loadData();
}
```

);
