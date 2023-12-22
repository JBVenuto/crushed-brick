import { useState } from 'react';
import {scrapeTodaysGames} from './api/scrapper';
import './App.scss';

function App() {
  const [league, setLeague] = useState('MLB');

  const selectedLeague = leagueName => leagueName === league;

  return (
    <section>
      <h1>Crushed Brick</h1>
      <nav>
        <button
          className={selectedLeague('MLB') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('MLB')}
        >
          MLB
        </button>
        <button
          className={selectedLeague('NFL') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('NFL')}
        >
          NFL
        </button>
        <button
          className={selectedLeague('NBA') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('NBA')}
        >
          NBA
        </button>
        <button
          className={selectedLeague('NHL') ? 'league-nav-selected' : 'league-nav'}
          onClick={() => setLeague('NHL')}
        >
          NHL
        </button>
      </nav>
      <article>
        <button onClick={scrapeTodaysGames}>click</button>
      </article>
    </section>
  );
}

export default App;
