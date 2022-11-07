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

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.availableLeagues = ['Española', 'Inglesa', 'Francesa']
  }

  searchResults() {
    console.log(this.selectedLeague)
    // asignar el valor a goalScorerItems
  }

}
