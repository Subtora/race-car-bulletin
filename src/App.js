import React, { useEffect, useState } from 'react';
import 'minireset.css';
import './App.css';

function Loader() {
  return (
    <div className="loader">
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--dot"></div>
      <div className="loader--text"></div>
    </div>
  );
}

function App() {
  const [roster, setRoster] = useState({});
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch(
      'https://v2-api.sheety.co/483642879b0fbfc0b773ec3bd0a70c0c/raceCarRankings/sheet1'
    )
      .then((res) => res.json())
      .then((json) => {
        let roster = json['sheet1'];
        roster.sort(function (a, b) {
          return b.score - a.score;
        });
        setRoster(roster);
      });

    setTimeout(() => {
      setActive(true);
    }, 1000);
  }, [setRoster]);

  return (
    <div className="main">
      <div className="top">
        <h1>Grand Prix: Practice Tracker</h1>
        <h2>Heather Smith Piano Studio</h2>
      </div>
      <div className="racetrack">
        {Object.keys(roster).length ? (
          Object.keys(roster).map((e, i) => (
            <div className="lane" key={i}>
              <div className="stats">
                <p className="name">{roster[e].name}</p>
                <p className="score">{roster[e].score}</p>
              </div>
              <div className="track">
                <div
                  className={`car${active ? ' start' : ''}`}
                  style={{
                    width: roster[e].score + '%',
                    transition: `width ${
                      5 - roster[e].score / 30
                    }s ease-in-out`,
                  }}
                ></div>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
        <div className="finish-line"></div>
      </div>
      <div className="footer">
        <h3>© Copyright 2020, trevorjs.dev</h3>
      </div>
    </div>
  );
}

export default App;
