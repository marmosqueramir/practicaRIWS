import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ElasticSearchMatchScoresApiService {
    private _elasticSearchUrl: string = environment.host + environment.matchIndexName+ "/_search";
    
    constructor(protected _httpClient: HttpClient) {}

    getMatchScoresByLeagueAndJourney(league: String, journey: String): Observable<Object> {
    const headers = new HttpHeaders({
        'Content-type': 'application/json'
        });
        
        return this._httpClient.post(this._elasticSearchUrl, JSON.stringify(this._getMatchBody(league, journey)), { headers });
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
}