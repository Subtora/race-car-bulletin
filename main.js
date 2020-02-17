let runway = document.getElementById("runway");
let index = 0;

$.getJSON("https://sheetsu.com/apis/v1.0su/bbf3612fc851", function(roster_raw) {
  let roster = roster_raw;
  roster_raw.sort(function(a, b) {
    return b.score.localeCompare(a.score);
  });

  Object.keys(roster).forEach(function(student) {
    let track = document.createElement("div");
    track.setAttribute("class", "track");
    track.innerHTML = roster[student].name;

    let progress = document.createElement("progress");
    progress.setAttribute("value", roster[student].score);
    progress.setAttribute("max", roster[student].max);

    track.appendChild(progress);
    runway.appendChild(track);

    index++;
  });
});
