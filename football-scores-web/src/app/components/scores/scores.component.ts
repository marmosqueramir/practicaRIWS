import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FootballScoreItem } from 'src/app/dto/FootballScoreItem';
import { ElasticSearchMatchScoresApiService } from 'src/app/services/elastic-search-match-api.service';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html'
})
export class ScoresComponent implements OnInit {

  resultForm = this._fb.group(
    {
      league: ['', Validators.required],
      journey: ['', Validators.required],
    }
  )

  selectedLeague: any = undefined;
  selectedJourney: any = undefined;
  
  availableLeagues: String[] = [];
  availableJourneys: String[] = [];

  footballScoreItems: FootballScoreItem[] = [];
  searchExecuted: boolean = false;

  displayedColumns: string[] = [
    'matchDay',
    'homeTeam',
    'matchResult',
    'awayTeam',
    'actions',
  ];

  constructor(
    private _fb: FormBuilder,
    private _elasticSearchMatchScoresApiService: ElasticSearchMatchScoresApiService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this.resultForm.get('journey')?.disable();
    this._elasticSearchMatchScoresApiService.getMatchLeaguesAvailables().subscribe((data: any) => {
      this.footballScoreItems = []
      for (let match of data.hits.hits) {
        var matchItem: FootballScoreItem = match._source;
        if (this.availableLeagues.indexOf(matchItem.league) == -1) {
          this.availableLeagues.push(matchItem.league);
        }
      }
    });
  }

  leagueSelected($event: any) {
    // Buscar las journeys con la liga que hayan seleccionado: $event.value
    this._elasticSearchMatchScoresApiService.getAvailableJourneysByLeague(this.selectedLeague).subscribe((data: any) => {
      for (let match of data.hits.hits) {
        var matchItem: FootballScoreItem = match._source;
        if (this.availableJourneys.indexOf(matchItem.journey) == -1) {
          this.availableJourneys.push(matchItem.journey);
        }
      }
    });

    this.resultForm.get('journey')?.enable();
  }

  searchResults(league: String, journey: String) {
    this.searchExecuted = true;
    this.footballScoreItems = [];
    this._elasticSearchMatchScoresApiService.getMatchScoresByLeagueAndJourney(league, journey).subscribe((data: any) => {
      for(let x of data.hits.hits) {
        var match: FootballScoreItem = x._source;
        this.footballScoreItems.push(match);
      }
    });
  }

  viewDetails(element: FootballScoreItem): void {
    this._router.navigate([element.id]);
  }

  isNull(result: String): String {
    if (result == null) {
      return "";
    } else {
      return result;
    }
  }
}