import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    private _elasticSearchMatchScoresApiService: ElasticSearchMatchScoresApiService
  ) { }

  ngOnInit(): void {
    this.resultForm.get('journey')?.disable();
    this.availableLeagues = ['Primera Division', 'Primera Federacion']
  }

  leagueSelected($event: any) {
    // Buscar las journeys con la liga que hayan seleccionado: $event.value
    this.availableJourneys = ['Jornada 1', 'Jornada 2', 'Jornada 3', 'Jornada 20']

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

  viewDetails(element: any): void {

  }

  isNull(result: String): String {
    if (result == null) {
      return "";
    } else {
      return result;
    }
  }
}