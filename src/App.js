import { useState } from 'react';
import { pastReulutsandNextGames, historicalTrends } from './utils/scrapper';
import './App.scss';
import mlb from './data/mlb.json';

function App() {
  const [league, setLeague] = useState('mlb');

  const selectedLeague = leagueName => leagueName === league;

  const getData = async () => {
    const [recentGames, historicalOdds] = await Promise.all([pastReulutsandNextGames(league), historicalTrends(league)])

    console.log('recent games:\n', recentGames);
    console.log('historic trends:\n', historicalOdds)
    recentGames.nextGames.forEach(game => {
      const awayRecord = historicalOdds[mlb.teams.translator[game.away]];
      const homeRecord = historicalOdds[mlb.teams.translator[game.home]];
      const overUnder = parseFloat(awayRecord.overUnder) + parseFloat(homeRecord.overUnder);
      const againstTheSpread = parseFloat(awayRecord.againstTheSpread) + parseFloat(homeRecord.againstTheSpread);
      console.log({
        away: awayRecord,
        home: homeRecord,
        overUnder: overUnder / 2,
        againstTheSpread: againstTheSpread / 2
      })
      
    })
  }

  return (
    <section>
      <h1>Crushed Brick</h1>
      <nav>
        <button
          className={selectedLeague('mlb') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('mlb')}
        >
          MLB
        </button>
        <button
          className={selectedLeague('nfl') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('nfl')}
        >
          NFL
        </button>
        <button
          className={selectedLeague('nba') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('nba')}
        >
          NBA
        </button>
        <button
          className={selectedLeague('nhl') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('nhl')}
        >
          NHL
        </button>
      </nav>
      <article>
        {/* <button onClick={() => scrapeTodaysGames(league)}>click</button> */}
        <button onClick={getData}>click</button>
      </article>
    </section>
  );
}

export default App;
