import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GoalScorerItems } from 'src/app/dto/FootballScoreItem';
import { ElasticSearchPlayersApiService } from 'src/app/services/elastic-search-players-api.service';

@Component({
  selector: 'app-goal-scorer',
  templateUrl: './goal-scorer.component.html'
})
export class GoalScorerComponent implements OnInit {

  goalScorerForm = this._fb.group(
    {
      league: ['', Validators.required]
    }
  )

  selectedLeague: any = undefined;
  availableLeagues: String[] = [];
  searchExecuted: boolean = false;
  goalScorerItems: GoalScorerItems[] = [];

  displayedColumns: string[] = [
    'ranking',
    'name',
    'goals',
    'position',
    'teamName',
  ];

  constructor(
    private _fb: FormBuilder,
    private _elasticSearchPlayersService: ElasticSearchPlayersApiService
  ) { }

  ngOnInit(): void {
    this._elasticSearchPlayersService.getPlayersLeaguesAvailables().subscribe((data: any) => {
      this.goalScorerItems = []
      for(let player of data.hits.hits) {
        var jugador: GoalScorerItems = player._source;
        if (this.availableLeagues.indexOf(jugador.league) == -1) {
          this.availableLeagues.push(jugador.league);
        }
      }
    });
  }

  searchResults(leagueToSearch: String) {
    this.searchExecuted = true;
    this.goalScorerItems = []
    this._elasticSearchPlayersService.getPlayersByLeague(leagueToSearch).subscribe((data: any) => {
      for(let player of data.hits.hits) {
        var jugador: GoalScorerItems = player._source;
        this.goalScorerItems.push(jugador);
      }
    });
  }
}
