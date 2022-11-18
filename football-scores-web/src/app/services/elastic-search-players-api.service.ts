import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ElasticSearchPlayersApiService {
  private _elasticSearchUrl: string = environment.host + environment.playerIndexName + "/_search"; 

  constructor(protected _httpClient: HttpClient) {}

  getPlayersByLeague(league: String): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });
    
    return this._httpClient.post(this._elasticSearchUrl + "?from=0&size=30", JSON.stringify(this._getPlayerBody(league)), { headers });
  }

  getPlayersLeaguesAvailables(): Observable<Object> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

    return this._httpClient.post(this._elasticSearchUrl + "?from=0&size=1000", JSON.stringify(this._getPlayerLeagueBody), { headers });
  }

  private _getPlayerLeagueBody(): any {
    const compoSiteQuery= {
      "size": 250,
      "sources": [{
        "terms": {
          "field": "league"
        }
      }]
    }
    
    const requestBody = 
    {
      "aggs": {
          "values": {
              "composite": compoSiteQuery
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