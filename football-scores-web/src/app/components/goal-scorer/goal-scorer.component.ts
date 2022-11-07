import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GoalScorerItems } from 'src/app/dto/FootballScoreItem';

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
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.availableLeagues = ['Española', 'Inglesa', 'Francesa']
  }

  searchResults() {
    var jugador: GoalScorerItems = {
      ranking: 1,
      name: 'Jorge Berbel',
      goals: 339,
      position : "DevOps",
      teamName : "Deportivo",
      league : "Española"
    }

    var jugador2: GoalScorerItems = {
      ranking: 2,
      name : "Pablo",
      goals : 200,
      position : "DevOps",
      teamName : "Deportivo",
      league : "Española"
    }

    this.goalScorerItems.push(jugador);
    this.goalScorerItems.push(jugador2);
    console.log(this.selectedLeague)
    // asignar el valor a goalScorerItems
  }

}
