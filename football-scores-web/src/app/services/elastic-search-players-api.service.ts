import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ElasticSearchPlayersApiService {
  private _elasticSearchUrl: string = environment.host + "player/_search"; 

  constructor(protected _httpClient: HttpClient) {}

  getPlayersLeagues(league: String): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    
    return this._httpClient.post(this._elasticSearchUrl, JSON.stringify(this._getPlayerBody(league)), { headers });
  }

  getPlayersLeaguesAvailables(): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this._httpClient.post(this._elasticSearchUrl, JSON.stringify(this._getPlayerLeagueBody), { headers });
  }

  private _getPlayerLeagueBody(): any {
    const requestBody = 
    {
      "size": "0",
      "aggs": {
          "uniq_gender": {
              "terms": {
                  "field": "league"
              }
          }
      }
    }
    
    return requestBody;
  }

  private _getPlayerBody(league: String): any {
    const requestBody = 
      {
        "query": {
          "match": {
              "league": league
          }
        }
      }
    
    return requestBody;
  }
}