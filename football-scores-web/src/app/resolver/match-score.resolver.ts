import { ElasticSearchMatchScoresApiService } from 'src/app/services/elastic-search-match-api.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { FootballScoreItem } from "../dto/FootballScoreItem";

@Injectable({ providedIn: 'root' })
export class MatchScoreByIdResolver implements Resolve<FootballScoreItem> {
    constructor(private _service: ElasticSearchMatchScoresApiService) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
      ): Observable<any> | Promise<any> | any {
        var x = route.paramMap.get("id")
        if (x != null) {
            return this._service.getMatchScoreById(+x);
        }
      }
}