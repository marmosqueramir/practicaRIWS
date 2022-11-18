import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ElasticSearchPlayersApiService {
  private _elasticSearchUrl: string = environment.host + "player/_search"; 

  constructor(protected _httpClient: HttpClient) {}

  getPlayersLeagues() {
    const headers = new HttpHeaders({
      'Content-type': 'application/json'
    });

     //this._httpClient.post(this._elasticSearchUrl, JSON.stringify(this._getPlayerLeagueBody)).map((res: Response) => HttpHelperService.json(res));
     return this._httpClient.post(this._elasticSearchUrl, JSON.stringify(this._getPlayerLeagueBody), { headers }).subscribe((data: any) => {
      console.log(data);
     });
  }

  private _getPlayerLeagueBody(): any {
    const requestBody = 
      {
        "query": {
          "match": {
              "league": "Primera Division"
          }
        }
      }
    
    return requestBody;
  }
}