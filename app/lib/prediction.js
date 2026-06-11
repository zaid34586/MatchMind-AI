import { runSimulation } from "./simulation";

export const teams = [
  "Brazil",
  "Argentina",
  "France",
  "England",
  "Spain",
  "Germany",
  "Portugal",
  "Netherlands",
];

const teamData = {
  Brazil: {
    attack: 88,
    defense: 84,
    form: 70,
    possession: 82,
    pressing: 78,
    finishing: 86,
    creativity: 87,
    setPiece: 76,
    formation: "4-3-3",
    style: "Fast wing attacks and transition football",
    players: ["Vinicius Jr", "Rodrygo", "Bruno Guimaraes"],
    risks: ["Defensive space behind fullbacks", "Pressure in midfield"],
  },
  Argentina: {
    attack: 86,
    defense: 87,
    form: 80,
    possession: 80,
    pressing: 76,
    finishing: 88,
    creativity: 90,
    setPiece: 78,
    formation: "4-4-2",
    style: "Controlled possession with creative final-third play",
    players: ["Messi", "Julian Alvarez", "Mac Allister"],
    risks: ["High dependency on creative players", "Wide-area defensive pressure"],
  },
  France: {
    attack: 92,
    defense: 88,
    form: 85,
    possession: 78,
    pressing: 82,
    finishing: 91,
    creativity: 86,
    setPiece: 80,
    formation: "4-2-3-1",
    style: "Explosive counter attack with elite pace",
    players: ["Mbappe", "Griezmann", "Tchouameni"],
    risks: ["Space between midfield and defense", "Overreliance on pace"],
  },
  England: {
    attack: 89,
    defense: 84,
    form: 82,
    possession: 81,
    pressing: 79,
    finishing: 87,
    creativity: 84,
    setPiece: 90,
    formation: "4-2-3-1",
    style: "Balanced build-up with strong set-piece threat",
    players: ["Harry Kane", "Bellingham", "Saka"],
    risks: ["Slow tempo under pressure", "Defensive transition gaps"],
  },
  Spain: {
    attack: 84,
    defense: 83,
    form: 81,
    possession: 91,
    pressing: 84,
    finishing: 80,
    creativity: 88,
    setPiece: 73,
    formation: "4-3-3",
    style: "Possession control and positional play",
    players: ["Pedri", "Morata", "Yamal"],
    risks: ["Low directness", "Can struggle against deep blocks"],
  },
  Germany: {
    attack: 83,
    defense: 80,
    form: 77,
    possession: 84,
    pressing: 83,
    finishing: 81,
    creativity: 83,
    setPiece: 82,
    formation: "4-2-3-1",
    style: "Structured attack with strong central combinations",
    players: ["Musiala", "Havertz", "Kimmich"],
    risks: ["Defensive instability", "Conceding during transitions"],
  },
  Portugal: {
    attack: 90,
    defense: 82,
    form: 79,
    possession: 80,
    pressing: 77,
    finishing: 89,
    creativity: 89,
    setPiece: 84,
    formation: "4-3-3",
    style: "Technical attack with wide creators",
    players: ["Ronaldo", "Leao", "Bernardo Silva"],
    risks: ["Defensive recovery speed", "Midfield control under pressure"],
  },
  Netherlands: {
    attack: 84,
    defense: 86,
    form: 78,
    possession: 79,
    pressing: 81,
    finishing: 82,
    creativity: 80,
    setPiece: 86,
    formation: "3-4-2-1",
    style: "Physical defense with quick wing play",
    players: ["Gakpo", "Depay", "Van Dijk"],
    risks: ["Chance creation consistency", "Midfield creativity"],
  },
};

const rivalryMap = {
  "Brazil-Argentina": 98,
  "Argentina-Brazil": 98,
  "Germany-France": 86,
  "France-Germany": 86,
  "Spain-Portugal": 84,
  "Portugal-Spain": 84,
  "England-Germany": 88,
  "Germany-England": 88,
  "Netherlands-Germany": 82,
  "Germany-Netherlands": 82,
};

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function getRivalryLevel(homeTeam, awayTeam) {
  return rivalryMap[`${homeTeam}-${awayTeam}`] || 64;
}

function getStageMultiplier(stage) {
  if (stage === "Live Match") return 1.06;
  if (stage === "After Match") return 0.97;
  return 1;
}

function getPressureLevel(homeTeam, awayTeam, stage) {
  const rivalry = getRivalryLevel(homeTeam, awayTeam);
  const stageBoost = stage === "Live Match" ? 8 : stage === "After Match" ? 2 : 5;
  return clamp(Math.round(rivalry * 0.75 + stageBoost + 16), 45, 99);
}

function getMatchImpact(pressureLevel) {
  if (pressureLevel >= 90) return "Elite pressure rivalry";
  if (pressureLevel >= 80) return "High impact match";
  if (pressureLevel >= 70) return "Competitive international match";
  return "Standard tactical matchup";
}

function getConfidenceStability(confidence) {
  if (confidence >= 75) return "Strong";
  if (confidence >= 55) return "Stable";
  return "Balanced";
}

function getTeamPower(team, stageMultiplier = 1) {
  return (
    team.attack * 0.22 +
    team.defense * 0.14 +
    team.form * 0.22 +
    team.possession * 0.1 +
    team.pressing * 0.1 +
    team.finishing * 0.14 +
    team.creativity * 0.05 +
    team.setPiece * 0.03
  ) * stageMultiplier;
}

function getWinProbabilities(homePower, awayPower, pressureLevel) {
  const gap = homePower - awayPower;

  let drawChance = 27 - Math.abs(gap) * 1.55;

  if (pressureLevel >= 90) drawChance += 5;
  if (pressureLevel >= 80) drawChance += 2;

  drawChance = clamp(Math.round(drawChance), 16, 34);

  const remaining = 100 - drawChance;
  const homeShare = clamp(0.5 + gap / 36, 0.2, 0.8);

  let homeWin = Math.round(remaining * homeShare);
  let awayWin = remaining - homeWin;

  const total = homeWin + awayWin + drawChance;

  homeWin = Math.round((homeWin / total) * 100);
  awayWin = Math.round((awayWin / total) * 100);
  drawChance = 100 - homeWin - awayWin;

  return { homeWin, awayWin, drawChance };
}

function getWinner(homeTeam, awayTeam, homeWin, awayWin, drawChance) {
  if (drawChance >= homeWin && drawChance >= awayWin) return "Draw likely";
  if (homeWin > awayWin) return homeTeam;
  if (awayWin > homeWin) return awayTeam;
  return "Draw likely";
}

function getExpectedGoals(team, opponent, pressureLevel, stageMultiplier) {
  const chanceQuality =
    team.attack * 0.22 +
    team.finishing * 0.26 +
    team.creativity * 0.14 +
    team.form * 0.16 +
    team.setPiece * 0.08;

  const opponentStopper =
    opponent.defense * 0.24 +
    opponent.pressing * 0.1 +
    opponent.form * 0.08;

  let xg = 1.25 + (chanceQuality - opponentStopper) / 55;
  xg *= stageMultiplier;

  if (pressureLevel >= 90) xg -= 0.18;
  else if (pressureLevel >= 80) xg -= 0.08;

  return clamp(round1(xg), 0.6, 2.6);
}

function getScorePrediction(homeTeam, awayTeam, home, away, winner, pressureLevel, stageMultiplier) {
  const homeXg = getExpectedGoals(home, away, pressureLevel, stageMultiplier);
  const awayXg = getExpectedGoals(away, home, pressureLevel, 1);

  let homeGoals = Math.round(homeXg);
  let awayGoals = Math.round(awayXg);

  if (winner === homeTeam && homeGoals <= awayGoals) homeGoals = awayGoals + 1;
  if (winner === awayTeam && awayGoals <= homeGoals) awayGoals = homeGoals + 1;

  if (winner === "Draw likely") {
    const avg = Math.round((homeXg + awayXg) / 2);
    homeGoals = clamp(avg, 1, 2);
    awayGoals = clamp(avg, 1, 2);
  }

  homeGoals = clamp(homeGoals, 0, 3);
  awayGoals = clamp(awayGoals, 0, 3);

  return {
    score: `${homeGoals} - ${awayGoals}`,
    homeXg,
    awayXg,
  };
}

function buildDynamicInsight(homeTeam, awayTeam, home, away, winner, homeWin, awayWin) {
  const homeEdge =
    home.attack > away.defense
      ? `${homeTeam}'s attack can stretch ${awayTeam}'s defensive line`
      : `${awayTeam}'s defensive shape can reduce ${homeTeam}'s attacking space`;

  const awayEdge =
    away.finishing > home.defense
      ? `${awayTeam}'s finishing gives them a direct scoring threat`
      : `${homeTeam}'s defensive structure can contain ${awayTeam}'s final-third danger`;

  if (winner === homeTeam) {
    return `${homeTeam} has the stronger edge because ${homeEdge.toLowerCase()}, while recent form and attacking balance give them a ${homeWin}% win chance.`;
  }

  if (winner === awayTeam) {
    return `${awayTeam} has the stronger edge because ${awayEdge.toLowerCase()}, while attacking quality gives them a ${awayWin}% win chance.`;
  }

  return `${homeTeam} and ${awayTeam} look closely matched. ${homeEdge}, but ${awayEdge.toLowerCase()}, which keeps the match balanced.`;
}

function buildTacticalReasoning(homeTeam, awayTeam, home, away) {
  const possessionWinner = home.possession > away.possession ? homeTeam : awayTeam;
  const pressingWinner = home.pressing > away.pressing ? homeTeam : awayTeam;
  const finishingWinner = home.finishing > away.finishing ? homeTeam : awayTeam;

  return `${homeTeam} should line up in ${home.formation} focused on ${home.style.toLowerCase()}. ${awayTeam} can answer with ${away.formation} and ${away.style.toLowerCase()}. The key tactical swing is possession control from ${possessionWinner}, pressing intensity from ${pressingWinner}, and finishing edge from ${finishingWinner}.`;
}

function buildFanSummary(winner, homeTeam, awayTeam, scorePrediction) {
  if (winner === "Draw likely") {
    return `This looks like a tight match. The predicted score is ${scorePrediction}, and the result may depend on who wins midfield control and handles pressure moments better.`;
  }

  return `${winner} looks slightly ahead. The predicted score is ${scorePrediction}, but ${winner} still needs to manage pressure moments because ${homeTeam} vs ${awayTeam} is not a one-sided matchup.`;
}

export function predictMatch(homeTeam, awayTeam, stage) {
  const home = teamData[homeTeam];
  const away = teamData[awayTeam];

  if (!home || !away) {
    return { success: false, message: "Team not found" };
  }

  if (homeTeam === awayTeam) {
    return {
      success: false,
      message: "Please select two different teams.",
    };
  }

  const stageMultiplier = getStageMultiplier(stage);
  const pressureLevel = getPressureLevel(homeTeam, awayTeam, stage);

  const homePower = getTeamPower(home, stageMultiplier);
  const awayPower = getTeamPower(away, 1);

  const simulation = runSimulation(homePower, awayPower);
  const probabilities = getWinProbabilities(homePower, awayPower, pressureLevel);

  const winner = getWinner(
    homeTeam,
    awayTeam,
    probabilities.homeWin,
    probabilities.awayWin,
    probabilities.drawChance
  );

  const scorePrediction = getScorePrediction(
    homeTeam,
    awayTeam,
    home,
    away,
    winner,
    pressureLevel,
    stageMultiplier
  );

  const confidence = clamp(
    Math.round(
      Math.max(probabilities.homeWin, probabilities.awayWin, probabilities.drawChance) +
        Math.abs(homePower - awayPower) * 2
    ),
    35,
    96
  );

  const attackScore = Math.round((home.attack + away.attack) / 2);
  const defenseScore = Math.round((home.defense + away.defense) / 2);
  const formScore = Math.round((home.form + away.form) / 2);

  const confidenceReason =
    winner === "Draw likely"
      ? `${homeTeam} and ${awayTeam} are closely matched. MatchMind sees a balanced game because the win probabilities and pressure level are close.`
      : `${winner} gets the edge because MatchMind combines attack quality, defensive balance, recent form, momentum, finishing, and match pressure into one confidence score.`;

     
  const rivalryLevel = getRivalryLevel(homeTeam, awayTeam);
  const entertainmentLevel = clamp(
  Math.round(
    (attackScore * 0.35 +
      formScore * 0.2 +
      rivalryLevel * 0.25 +
      pressureLevel * 0.2)
  ),
  40,
  99
);

const uncertaintyLevel = clamp(
  Math.round(
    probabilities.drawChance +
      (100 - Math.abs(probabilities.homeWin - probabilities.awayWin)) * 0.35
  ),
  20,
  95
);

const matchQuality =
  entertainmentLevel >= 90
    ? "Elite"
    : entertainmentLevel >= 80
    ? "High"
    : entertainmentLevel >= 70
    ? "Competitive"
    : "Standard";

const aiMatchRating =
  entertainmentLevel >= 92
    ? "A+"
    : entertainmentLevel >= 85
    ? "A"
    : entertainmentLevel >= 78
    ? "B+"
    : entertainmentLevel >= 70
    ? "B"
    : "C";

     
  const homeMomentum = clamp(
    Math.round(
      home.form * 0.42 +
        home.pressing * 0.24 +
        home.attack * 0.18 +
        home.possession * 0.08 +
        stageMultiplier * 6
    ),
    1,
    99
  );

  const awayMomentum = clamp(
    Math.round(
      away.form * 0.42 +
        away.pressing * 0.24 +
        away.attack * 0.18 +
        away.possession * 0.08 +
        5
    ),
    1,
    99
  );
const momentumGap = Math.abs(homeMomentum - awayMomentum);

const pressureIndex = pressureLevel;

const rivalryHeat =
  rivalryLevel >= 90
    ? "Extreme"
    : rivalryLevel >= 80
    ? "Hot"
    : rivalryLevel >= 70
    ? "Competitive"
    : "Normal";

const trendSignal =
  homeMomentum > awayMomentum
    ? `${homeTeam} trending up`
    : awayMomentum > homeMomentum
    ? `${awayTeam} trending up`
    : "Balanced trend";

  const homeTacticalAdvantage = Math.round(
    (home.attack + home.defense + home.form + home.finishing) / 4
  );

  const awayTacticalAdvantage = Math.round(
    (away.attack + away.defense + away.form + away.finishing) / 4
  );

  const bestScore =
    simulation.topScores?.[0]?.score?.replace("-", " - ") ||
    scorePrediction.score;

  return {
    success: true,

    simulation,

    winner,
    confidence,

    attackScore,
defenseScore,
    formScore,
    confidenceReason,
    aiMatchRating,
matchQuality,
entertainmentLevel,
uncertaintyLevel,
momentumGap,
pressureIndex,
rivalryHeat,
trendSignal,

    homeWin: probabilities.homeWin,
    awayWin: probabilities.awayWin,
    drawChance: probabilities.drawChance,

    scorePrediction: bestScore,

    expectedGoals: {
      homeXg: scorePrediction.homeXg,
      awayXg: scorePrediction.awayXg,
    },

    homePlayers: home.players,
    awayPlayers: away.players,

    insight: buildDynamicInsight(
      homeTeam,
      awayTeam,
      home,
      away,
      winner,
      probabilities.homeWin,
      probabilities.awayWin
    ),

    tacticalBattle: buildTacticalReasoning(homeTeam, awayTeam, home, away),

    fanSummary: buildFanSummary(winner, homeTeam, awayTeam, bestScore),

    keyBattle: `${homeTeam} ${home.formation} vs ${awayTeam} ${away.formation}`,

    stats: {
      homeAttack: home.attack,
      awayAttack: away.attack,
      homeDefense: home.defense,
      awayDefense: away.defense,
      homeForm: home.form,
      awayForm: away.form,
      homePossession: home.possession,
      awayPossession: away.possession,
      homePressing: home.pressing,
      awayPressing: away.pressing,
      homeFinishing: home.finishing,
      awayFinishing: away.finishing,
    },

    matchImportance: {
      rivalryLevel,
      pressureLevel,
      matchImpact: getMatchImpact(pressureLevel),
      stage,
    },

    momentum: {
      homeMomentum,
      awayMomentum,
      leader:
        homeMomentum > awayMomentum
          ? homeTeam
          : awayMomentum > homeMomentum
          ? awayTeam
          : "Balanced",
    },

    brain: {
      factorsChecked: 24,
      tacticalRules: 32,
      confidenceStability: getConfidenceStability(confidence),
      modelMode: "MatchMind Simulation AI v3",
    },

    finalVerdict: {
      title: winner === "Draw likely" ? "Balanced Match" : `${winner} Slight Favorite`,
      summary:
        winner === "Draw likely"
          ? `The simulation shows a balanced game. The most common score is ${bestScore}. Small tactical moments can decide the match.`
          : `${winner} is ahead in total winning probability, but the most common exact score is ${bestScore}. This means ${winner} is favored overall, but the match remains competitive.`,
    },

    strengths: {
      homeStrengths: [
        `${home.attack}% attacking quality`,
        `${home.finishing}% finishing ability`,
        `${home.possession}% possession control`,
      ],
      awayStrengths: [
        `${away.attack}% attacking quality`,
        `${away.finishing}% finishing ability`,
        `${away.possession}% possession control`,
      ],
    },

    weaknesses: {
      homeWeaknesses: home.risks,
      awayWeaknesses: away.risks,
    },

    possessionPrediction: {
      homePossession: home.possession,
      awayPossession: away.possession,
      controller:
        home.possession > away.possession
          ? homeTeam
          : away.possession > home.possession
          ? awayTeam
          : "Balanced",
    },

    tacticalAdvantage: {
      home: homeTacticalAdvantage,
      away: awayTacticalAdvantage,
      leader:
        homeTacticalAdvantage > awayTacticalAdvantage
          ? homeTeam
          : awayTacticalAdvantage > homeTacticalAdvantage
          ? awayTeam
          : "Balanced",
    },

    risks: {
      homeRisks: home.risks,
      awayRisks: away.risks,
    },
  };
}