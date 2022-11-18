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
    this.availableLeagues = ['Primera Federación']
  }

  leagueSelected($event: any) {
    // Buscar las journeys con la liga que hayan seleccionado: $event.value
    this.availableJourneys = ['Jornada 1', 'Jornada 2', 'Jornada 3']

    this.resultForm.get('journey')?.enable();
  }

  searchResults(league: String, journey: String) {
    console.log(this.selectedJourney)
    console.log(this.selectedLeague)

    this._elasticSearchMatchScoresApiService.getMatchScoresByLeagueAndJourney(league, journey).subscribe((data: any) => {
      for(let x of data.hits.hits) {
        var match: FootballScoreItem = x._source;
        this.footballScoreItems.push(match);
      }
    });
    //this.footballScoreItems.push(resultado1)
  }

  viewDetails(element: any): void {

  }
}