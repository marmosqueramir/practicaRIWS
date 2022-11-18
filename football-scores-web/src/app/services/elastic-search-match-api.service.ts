import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ElasticSearchMatchScoresApiService {
    private _elasticSearchUrl: string = environment.host + environment.matchIndexName + "/_search";
    
    constructor(protected _httpClient: HttpClient) {}

    getMatchScoresByLeagueAndJourney(league: String, journey: String): Observable<Object> {
        const headers = new HttpHeaders({
        'Content-type': 'application/json'
        });
        
        return this._httpClient.post(this._elasticSearchUrl, JSON.stringify(this._getMatchBody(league, journey)), { headers });
    }

    getAvailableJourneysByLeague(league: string): Observable<Object> {
        const headers = new HttpHeaders({
            'Content-type': 'application/json'
        });
        return this._httpClient.post(this._elasticSearchUrl + "?from=0&size=1000", JSON.stringify(this._getJourneyRequestBody(league)), { headers });
    }

    getMatchScoreById(id: number): Observable<Object> {
        const headers = new HttpHeaders({
            'Content-type': 'application/json'
        });
        return this._httpClient.get<Object>(environment.host + environment.matchIndexName + "/_doc/" + id);
    }

    private _getMatchBody(league: String, journey: String): any {
        const requestBody = 
        {
            "query": {
                "bool": {
                    "must": [
                        {
                            "match": {
                                "league": league
                            }
                        },
                        {
                            "match": {
                                "journey": journey
                            }
                        }
                    ]
                }
            }
        }
        
        return requestBody;
    }

    private _getJourneyRequestBody(league: String): any {
        const requestBody =
        {
            "_source": "journey",
            "query": {
                "match": {
                    "league": league
                }
            }
        }
        return requestBody;
    }

    getMatchLeaguesAvailables(): Observable<Object> {
        const headers = new HttpHeaders({
          'Content-type': 'application/json'
        });
        return this._httpClient.post(this._elasticSearchUrl + "?from=0&size=1000", JSON.stringify(this._getMatchLeagueBody), { headers });
      }
      private _getMatchLeagueBody(): any {
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
}