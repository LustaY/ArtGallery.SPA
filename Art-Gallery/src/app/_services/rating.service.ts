import { environment } from "src/environment";
import { Item } from "../_models/Item";
import { HttpClient } from "@angular/common/http";
import { LogService } from "./log.service";
import { ItemService } from "./item.service";
import { Observable, tap } from "rxjs";
import { Rating } from "../_models/Rating";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class RatingService{
    private baseUrl: string = environment.baseUrl + 'api/';
    item: Item;
    constructor(
        private http: HttpClient,
        private logService: LogService,
        private itemService: ItemService,
    ) { }

    private log(message: string, itemId: number) {
        this.itemService.getItemById(itemId).subscribe(
            (item) => {
                this.item = item;
                const date = new Date();
                this.logService.add(date.toLocaleString() + `: ${message} in item ${item.name}`);
            }
        );
    }

    public getRatingsByItem(itemId: number): Observable<Rating[]> {
        return this.http.get<Rating[]>(`${this.baseUrl}Rating/get-ratings-by-item/${itemId}`)
            // .pipe(
            //     tap(_ => this.log(` get comments `, itemId))
            // );
    }

    public addRating(rating: Rating) {
        return this.http.post(this.baseUrl + 'Rating', rating)
            .pipe(
                tap(_ => this.log(`added rating `, rating.itemId))
            );
    }
}