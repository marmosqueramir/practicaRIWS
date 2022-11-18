export interface FootballScoreItem {
    id: number;
    homeTeam: String;
    homeScore?: String;
    homeShield: String;
    awayTeam: String;
    awayScore: String;
    awayShield: String;
    matchDay?: Date;
    matchStadium?: String;
    matchResult?: String;
    league: String;
    journey: String;
}

export interface GoalScorerItems {
    id: number
    ranking: String;
    name: String;
    goals: String;
    position: String;
    teamName: String;
    league: String;
}