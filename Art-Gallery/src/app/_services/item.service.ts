import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../_models/Item';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment';
import { LogService } from './log.service';
import { Category } from '../_models/Category';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private baseUrl: string = environment.baseUrl + 'api/';
    categories: Category[]=[];
    constructor(
        private http: HttpClient,
        private logService: LogService,
        ) { }



    private log(message: string, categoryId: number) {
        

        const date= new Date();
        this.logService.add(date.toLocaleString() +": "+message+` in category=${categoryId}`);
      }

    public addItem(item: Item) {
        return this.http.post(this.baseUrl + 'item', item)
        .pipe(
            tap(_ => this.log(`add item ${item.name}`,item.categoryId))
          );
    }

    public updateItem(id: number, item: Item) {
        return this.http.put(this.baseUrl + 'item/' + id, item)
        .pipe(
            tap(_ => this.log(`updated item ${item.name}`,item.categoryId))
          );
    }

    public getItems(): Observable<Item[]> {
        return this.http.get<Item[]>(this.baseUrl + `item`);
    }

    public deleteItem(id: number) {
        return this.http.delete(this.baseUrl + 'item/' + id);
    }

    public getItemById(id): Observable<Item> {
        return this.http.get<Item>(this.baseUrl + 'item/' + id);
    }

    public searchItemsWithCategory(searchedValue: string): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.baseUrl}item/search-item-with-category/${searchedValue}`);
    }

    public getItemsByCategory(categoryId: number): Observable<Item[]> {
        return this.http.get<Item[]>(`${this.baseUrl}item/get-items-by-category/${categoryId}`)
        .pipe(
            tap(_ => this.log(`fetched items `,categoryId))
          );
    }
}