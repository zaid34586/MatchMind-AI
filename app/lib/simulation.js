export function runSimulation(homePower, awayPower) {
  let homeWins = 0;
  let awayWins = 0;
  let draws = 0;

  const scoreMap = {};

  for (let i = 0; i < 1000; i++) {
    const homeStrength =
      homePower + (Math.random() * 12 - 6);

    const awayStrength =
      awayPower + (Math.random() * 12 - 6);

    let homeGoals = Math.max(
      0,
      Math.min(
        4,
        Math.round((homeStrength - 70) / 8)
      )
    );

    let awayGoals = Math.max(
      0,
      Math.min(
        4,
        Math.round((awayStrength - 70) / 8)
      )
    );

    if (homeGoals > awayGoals) {
      homeWins++;
    } else if (awayGoals > homeGoals) {
      awayWins++;
    } else {
      draws++;
    }

    const scoreKey = `${homeGoals}-${awayGoals}`;

    scoreMap[scoreKey] =
      (scoreMap[scoreKey] || 0) + 1;
  }

  const topScores = Object.entries(scoreMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([score, count]) => ({
      score,
      percentage: (
        (count / 1000) *
        100
      ).toFixed(1),
    }));

  return {
    simulations: 1000,
    homeWins,
    awayWins,
    draws,
    topScores,
  };
}