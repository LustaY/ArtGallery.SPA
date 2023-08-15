import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../_models/Item';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private baseUrl: string = environment.baseUrl + 'api/';

    constructor(private http: HttpClient) { }

    public addItem(item: Item) {
        return this.http.post(this.baseUrl + 'item', item);
    }

    public updateItem(id: number, item: Item) {
        return this.http.put(this.baseUrl + 'item/' + id, item);
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
}