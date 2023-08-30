import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Item } from '../_models/Item';
import { Observable, map } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environment';
import { LogService } from './log.service';
import { Category } from '../_models/Category';
import { CategoryService } from './category.service';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private baseUrl: string = environment.baseUrl + 'api/';
    category: Category;
    file: File | null = null
    headers = new HttpHeaders()
        .set('Accept', 'application/json')
        .set('Authorization', ' OAuth y0_AgAAAAAHoXZFAAppswAAAADrbRi6LOHaN5A2QHagldfIGzlr1hvfFNA');
    constructor(
        private http: HttpClient,
        private logService: LogService,
        private categoryService: CategoryService,
    ) { }



    private log(message: string, categoryId: number) {
        this.categoryService.getCategoryById(categoryId).subscribe(
            (category) => {
                this.category = category
                const date = new Date();
                this.logService.add(date.toLocaleString() + `: ${message} in category ${category.name}`);
            }
        );
    }

    public getFileFromDisk(name:string):Observable<JSON> {
        return this.http.get<JSON>('https://cloud-api.yandex.net/v1/disk/resources/download?path=' + '/ArtGallery/' + name, { 'headers': this.headers })
    }

    public getSmallFileFromDisk(link:string):Observable<JSON> {
        return this.http.get<JSON>(link, { 'headers': this.headers })
    }

    public getFileResourceFromDisk(name:string):Observable<JSON> {
        return this.http.get<JSON>('https://cloud-api.yandex.net/v1/disk/resources?path=' + '/ArtGallery/' + name, { 'headers': this.headers })
    }

    public getUploadLink(name: string):Observable<JSON> {
        return this.http.get<JSON>('https://cloud-api.yandex.net/v1/disk/resources/upload?path=' + '/ArtGallery/' + name, { 'headers': this.headers });
    }

    public uploadFileOnDisk(link: string,file:File) {
        return this.http.put(link,file);
    }

    public addItem(item: Item) {
        return this.http.post(this.baseUrl + 'item', item)
            .pipe(
                tap(_ => this.log(`created item ${item.name}`, item.categoryId))
            );
    }

    public updateItem(id: number, item: Item) {
        return this.http.put(this.baseUrl + 'item/' + id, item)
            .pipe(
                tap(_ => this.log(`updated item ${item.name}`, item.categoryId))
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
                tap(_ => this.log(`fetched items `, categoryId))
            );
    }

    public getItemsByPage(categoryId: number, page: number, size: number) {
        return this.http.get<Item[]>(`${this.baseUrl}item/get-items-by-page/categoryId=${categoryId}&page=${page}&size=${size}`)
    }
}