import * as cheerio from "cheerio";
import axios from "axios";

export async function pastReulutsandNextGames(league) {
  const res = await axios.get(
    `https://www.oddsshark.com/api/ticker/${league}?_format=json`
  );
  const nextGames = res.data.matches[1].matches.map((game) => ({
    away: game.teams.away.name,
    home: game.teams.home.name,
    "overUnder": game.total,
  }));
  const lastGames = res.data.matches[0].matches.map((game) => ({
    away: game.teams.away.name,
    awayScore: game.teams.away.score,
    home: game.teams.home.name,
    homeScore: game.teams.home.score,
    predictedOverUnder: game.total,
    actualOverUnder: game.trandingTotal,
  }));

  return ({
    nextGames,
    lastGames
  });
}

export async function historicalTrends(league) {
  const res = await axios.get(`https://www.scoresandodds.com/${league}/teams`);
  const $ = cheerio.load(res.data);
  const tableColumnsArray = $(".game-table tbody");
  const teamsData = tableColumnsArray[0].children.filter(
    (element) => element.name === "tr"
  );
  const teams = {};

  teamsData.forEach((team) => {
    const teamName =
      team.children[1].children[1].children[3].children[1].children[1]
        .children[0].data.replace(/\s\(\d+\)$/, '');
    const teamData = team.attribs;
    teams[teamName] = {
      overUnder: teamData["data-overs"],
      againstTheSpread: teamData["data-spread"],
    };
  });

  return teams;
}
