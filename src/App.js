import { useState } from 'react';
import { pastReulutsandNextGames, historicalTrends } from './utils/scrapper';
import './App.scss';

function App() {
  const [league, setLeague] = useState('mlb');

  const selectedLeague = leagueName => leagueName === league;

  const getData = async () => {
    // const historicalOdds = await historicalTrends(league);
    const recentGames = await pastReulutsandNextGames(league);

    console.log(recentGames);
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
