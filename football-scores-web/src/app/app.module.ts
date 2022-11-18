import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScoresComponent } from './components/scores/scores.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { GoalScorerComponent } from './components/goal-scorer/goal-scorer.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ElasticSearchPlayersApiService } from './services/elastic-search-players-api.service';
import { HttpClientModule } from '@angular/common/http';
import { ScoresDetailComponent } from './components/scores-detail/scores-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoresComponent,
    NavbarComponent,
    GoalScorerComponent,
    ScoresDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
  ],
  providers: [ElasticSearchPlayersApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
