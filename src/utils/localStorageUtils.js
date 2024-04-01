export function getPreviousGames(league) {
    return JSON.parse(localStorage.getItem(league));
}

export function putNextGames(league, nextGames) {
    const nextGamesString = JSON.stringify(nextGames);
    localStorage.setItem(league, nextGamesString);
}
