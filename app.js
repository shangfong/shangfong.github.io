fetch("./data/f1.json")
  .then(r => r.json())
  .then(data => {

    document.getElementById("content").innerHTML =
      `
      <h2>${data.events[0].name}</h2>
      <p>${data.events[0].location}</p>
      `;
  });
