let runway = document.getElementById("runway");
let index = 0;

$.getJSON(
  "https://v2-api.sheety.co/483642879b0fbfc0b773ec3bd0a70c0c/racecarBulletin/sheet1",
  function(roster_raw) {
    let roster = roster_raw["sheet1"];

    roster.sort(function(a, b) {
      return b.score - a.score;
    });

    Object.keys(roster).forEach(function(student) {
      let track = document.createElement("div");
      track.setAttribute("class", "track");

      let label = document.createElement("p");
      label.innerHTML = roster[student].name;
      label.setAttribute("class", "label");
      track.appendChild(label);

      let progress = document.createElement("input");
      progress.setAttribute("class", "slider");
      progress.setAttribute("value", roster[student].score);
      progress.setAttribute("type", "range");
      progress.setAttribute("min", 0);
      progress.setAttribute("max", 30);

      track.appendChild(progress);

      runway.appendChild(track);

      index++;
    });
  }
);
