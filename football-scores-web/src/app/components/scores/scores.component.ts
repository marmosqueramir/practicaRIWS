import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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

  selectedLeague: any;
  selectedJourney: any;
  
  availableLeagues: String[] = [];
  availableJourneys: String[] = [];

  constructor(
    private _fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.availableLeagues = ['Española', 'Inglesa', 'Francesa']
    this.availableJourneys = ['Jornada 1', 'Jornada 2', 'Jornada 3']
  }
}