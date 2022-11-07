import { ScoresComponent } from './components/scores/scores.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalScorerComponent } from './components/goal-scorer/goal-scorer.component';

const routes: Routes = [
  {
    path: '',
    component: ScoresComponent
  },
  {
    path: 'goalScorer',
    component: GoalScorerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
