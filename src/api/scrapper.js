import * as cheerio from "cheerio";
import axios from "axios";

export async function scrapeTodaysGames() {
  axios.get("https://www.espn.com/nba/scoreboard").then((res) => {
    const $ = cheerio.load(res.data);
    const gamecardArr = $(".ScoreCell__TeamName");
    const bettingArr = $(".Odds__Message")
    const nextGames = [];

    for (let i = 0; i < bettingArr.length; i++) {
        const teamI = i * 2;
        const gameObj = {
            "away": gamecardArr[teamI].children[0].data,
            "home": gamecardArr[teamI + 1].children[0].data,
            "ats": {
                "favorite": bettingArr[i].children[0].data.split(' ')[1],
                "spread": bettingArr[i].children[0].data.split(' ')[2]
            },
            "o/u": bettingArr[i].children[1].children[0].data.split(' ')[1]
        };
        nextGames.push(gameObj);
    }

    console.log(nextGames)
  });
}
