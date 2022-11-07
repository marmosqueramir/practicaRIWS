export interface FootballScoreItem {
    homeTeam: String;
    homeScore: number;
    homeShield: String;
    awayTeam: String;
    awayScore: number;
    awayShield: String;
    matchDay: Date;
    matchStadium: String;
    matchResult: String;
    league: String;
    journey: String;
}

export interface GoalScorerItems {
    ranking: number;
    name: String;
    goals: number;
    position: String;
    teamName: String;
    league: String;
}