import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FootballScoreItem } from 'src/app/dto/FootballScoreItem';

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
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.resultForm.get('journey')?.disable();
    this.availableLeagues = ['Española', 'Inglesa', 'Francesa']
  }

  leagueSelected($event: any) {
    // Buscar las journeys con la liga que hayan seleccionado: $event.value
    this.availableJourneys = ['Jornada 1', 'Jornada 2', 'Jornada 3']

    this.resultForm.get('journey')?.enable();
  }

  searchResults() {
    console.log(this.selectedJourney)
    console.log(this.selectedLeague)
    var resultado1: FootballScoreItem = {
      homeTeam: 'Barcelona',
      homeScore: 0,
      homeShield: 'https://t.resfu.com/img_data/escudos/small/429.jpg?size=37x&5',
      awayTeam: 'Madrid',
      awayScore: 2,
      awayShield: 'https://t.resfu.com/img_data/escudos/small/429.jpg?size=37x&5',
      matchDay: undefined,
      matchStadium: undefined,
      matchResult: undefined,
      league: 'Española',
      journey: 'Jornada 1'
    }
    var resultado2: FootballScoreItem = {
      homeTeam: 'Barcelona',
      homeScore: 0,
      homeShield: 'https://t.resfu.com/img_data/escudos/small/429.jpg?size=37x&5',
      awayTeam: 'Madrid',
      awayScore: 2,
      awayShield: 'https://t.resfu.com/img_data/escudos/small/429.jpg?size=37x&5',
      matchDay: undefined,
      matchStadium: undefined,
      matchResult: undefined,
      league: 'Española',
      journey: 'Jornada 1'
    }

    this.footballScoreItems.push(resultado1)
    this.footballScoreItems.push(resultado2);
    // asignar el valor a footballScoreItems

  }

  viewDetails(element: any): void {

  }
}