import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballScoreItem } from 'src/app/dto/FootballScoreItem';

@Component({
  selector: 'app-scores-detail',
  templateUrl: './scores-detail.component.html'
})
export class ScoresDetailComponent implements OnInit {

  private _currentMatch: FootballScoreItem | undefined;
  columnsValue: FootballScoreItem[] = [];
  displayedColumns: String[] = [
    'stadium',
    'referee',
  ];

  constructor(
    private _activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._currentMatch = this._activatedRoute.snapshot.data['match']._source;
    if (this._currentMatch) {
      this.columnsValue.push(this._currentMatch);
    }
  }

}
