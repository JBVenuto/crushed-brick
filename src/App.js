import { useState } from "react";
import { pastReulutsandNextGames, historicalTrends } from "./utils/scrapper";
import "./App.scss";
import teamList from "./data/teamList.json";

function App() {
  const [league, setLeague] = useState("mlb");
  const [gamePredictions, setGamePredictions] = useState([]);
  const selectedLeague = (leagueName) => leagueName === league;

  const getData = async () => {
    const [recentGames, historicalOdds] = await Promise.all([
      pastReulutsandNextGames(league),
      historicalTrends(league),
    ]);

    setGamePredictions(
      recentGames.nextGames.map((game) => {
        const awayRecord = historicalOdds[teamList[league][game.away]],
          homeRecord = historicalOdds[teamList[league][game.home]],
          overUnder =
            parseFloat(awayRecord.overUnder) + parseFloat(homeRecord.overUnder),
          againstTheSpread =
            parseFloat(awayRecord.againstTheSpread) >
            parseFloat(homeRecord.againstTheSpread) + 0.02
              ? game.away
              : parseFloat(awayRecord.againstTheSpread) + 0.02 <
                parseFloat(homeRecord.againstTheSpread)
              ? game.home
              : "too close";

        return {
          away: game.away,
          home: game.home,
          overUnder: overUnder / 2,
          againstTheSpread: againstTheSpread,
        };
      })
    );
  };

  return (
    <section>
      <h1>Crushed Brick</h1>
      <nav>
        <button
          className={
            selectedLeague("mlb") ? "league-nav-selected" : "league-nav"
          }
          onClick={() => setLeague("mlb")}
        >
          MLB
        </button>
        <button
          className={
            selectedLeague("nfl") ? "league-nav-selected" : "league-nav"
          }
          onClick={() => setLeague("nfl")}
        >
          NFL
        </button>
        <button
          className={
            selectedLeague("nba") ? "league-nav-selected" : "league-nav"
          }
          onClick={() => setLeague("nba")}
        >
          NBA
        </button>
        <button
          className={
            selectedLeague("nhl") ? "league-nav-selected" : "league-nav"
          }
          onClick={() => setLeague("nhl")}
        >
          NHL
        </button>
      </nav>
      <article>
          {gamePredictions.length > 0 && (
            <table>
              <tr>
                <th>Matchup</th>
                <th>Combined Over %</th>
                <th></th>
                <th>Spread predictor</th>
              </tr>
              {gamePredictions.map(game => (
                <tr>
                  <td>
                    <div>{game.away}</div>
                    <div>{game.home}</div>
                  </td>
                  <td>{game.overUnder}</td>
                  <td></td>
                  <td>{game.againstTheSpread}</td>
                </tr>
              ))}
            </table>
          )}
        <button onClick={getData}>Get Data</button>
      </article>
    </section>
  );
}

export default App;
