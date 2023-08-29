import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';
import { LogService } from './log.service';
import { Observable, tap } from 'rxjs';
import { Item } from '../_models/Item';
import { ItemService } from './item.service';
import { Comment } from '../_models/Comment';

@Injectable({
    providedIn: 'root'
})

export class CommentService {
    private baseUrl: string = environment.baseUrl + 'api/';
    //categoryService: any;
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

    public getCommentsByItem(itemId: number): Observable<Comment[]> {
        return this.http.get<Comment[]>(`${this.baseUrl}Comment/get-comments-by-item/${itemId}`)
            // .pipe(
            //     tap(_ => this.log(` get comments `, itemId))
            // );
    }

    public getById(commentId: number): Observable<Comment> {
        return this.http.get<Comment>(`${this.baseUrl}Comment/${commentId}`)
    }

    public addComment(comment: Comment) {
        return this.http.post(this.baseUrl + 'Comment', comment)
            .pipe(
                tap(_ => this.log(`created comment `, comment.itemId))
            );
    }


}
