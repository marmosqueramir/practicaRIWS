import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GoalScorerItems } from 'src/app/dto/FootballScoreItem';
import { ElasticSearchPlayersApiService } from 'src/app/services/elastic-search-players-api.service';

@Component({
  selector: 'app-goal-scorer',
  templateUrl: './goal-scorer.component.html',
  styleUrls: ['./goal-scorer.component.scss']
})
export class GoalScorerComponent implements OnInit {

  goalScorerForm = this._fb.group(
    {
      league: ['', Validators.required]
    }
  )

  selectedLeague: any = undefined;
  availableLeagues: String[] = [];

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
    this.availableLeagues = ['Primera Division']
  }

  searchResults(leagueToSearch: String) {


    this._elasticSearchPlayersService.getPlayersLeagues(leagueToSearch).subscribe((data: any) => {
      for(let x of data.hits.hits) {
        var jugador: GoalScorerItems = x._source;
        this.goalScorerItems.push(jugador);
      }
    });
  }
}
