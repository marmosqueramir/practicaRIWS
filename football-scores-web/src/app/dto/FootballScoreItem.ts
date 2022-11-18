export interface FootballScoreItem {
    homeTeam: String;
    homeScore?: number;
    homeShield: String;
    awayTeam: String;
    awayScore: number;
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