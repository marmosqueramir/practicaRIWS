import { ScoresDetailComponent } from './components/scores-detail/scores-detail.component';
import { ScoresComponent } from './components/scores/scores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalScorerComponent } from './components/goal-scorer/goal-scorer.component';
import { MatchScoreByIdResolver } from './resolver/match-score.resolver';

const routes: Routes = [
  {
    path: '',
    component: ScoresComponent
  },
  {
    path: 'goalScorer',
    component: GoalScorerComponent
  },
  {
    path: ':id',
    component: ScoresDetailComponent,
    resolve: {
      match: MatchScoreByIdResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
