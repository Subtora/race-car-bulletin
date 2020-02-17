let index = 0;
let runway = document.getElementById("runway");

async function run() {
  let res = await fetch(
    "https://v2-api.sheety.co/483642879b0fbfc0b773ec3bd0a70c0c/racecarBulletin/sheet1"
  )
    .then(res => res.json())
    .then(data => {
      let roster = data["sheet1"];

      roster.sort(function(a, b) {
        return b.score - a.score;
      });

      Object.keys(roster).forEach(function(student) {
        let track = document.createElement("div");
        let car = document.createElement("i");
        let label = document.createElement("p");
        let score = document.createElement("span");

        track.setAttribute("class", "track");
        score.setAttribute("class", "score");

        label.innerHTML = roster[student].name;
        score.innerHTML = roster[student].score;

        label.setAttribute("class", "label");
        car.setAttribute("class", "car fas fa-car-side");

        track.appendChild(label);
        track.appendChild(car);
        label.appendChild(score);
        runway.appendChild(track);

        let pos =
          (car.parentNode.offsetWidth * roster[student].score) /
            roster[student].max -
          20 -
          label.offsetWidth -
          car.offsetWidth;

        if (roster[student].score == 1) {
          car.style.transform = `translateX(6px)`;
        } else if (roster[student].score == 2) {
          car.style.transform = `translateX(16px)`;
        } else {
          car.style.transform = `translateX(${pos}px)`;
        }
      });
    })
    .then(() => {});
}

run();
