export function getOdds(premium: number) {
    const odds = 1 / premium;
    return odds;
  }
  
  export function getPremium(odds: number) {
    return 1 / odds;
  }

  export function convertOddsToFavor(odds: number): number {
    // Calculate the implied probability of the given odds
    let impliedProbability: number = getPremium(odds);
    
    // Adjust the implied probability to include the edge
    let newProbability: number = impliedProbability + Number(process.env.PROBABILITY_IN_OUR_FAVOUR);
    
    if (newProbability <= 0) {
        throw new Error("The edge is too large for the given odds.");
    }
    
    let newOdds: number = getOdds(newProbability);
    
    return newOdds;
}