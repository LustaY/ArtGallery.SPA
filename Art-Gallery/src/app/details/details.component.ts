import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from '../_services/comment.service';
import { Comment } from '../_models/Comment';
import { RatingService } from '../_services/rating.service';
import { Rating } from '../_models/Rating';
import { NavigationEvent } from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-view-model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  public commentData: Comment;
  public ratingData: Rating;
  public categories: any;
  public itemDetail: any;
  public authors: string[] = [
    'Mike',
    'Gordon',
    'Sigizmund',
    'Geralt',
    'Hetfield',
    'Max',
    'Arthas'
  ];
  public randomAuthor: string = 'Sam';
  public comments: Comment[] = [];
  public ratings: Rating[] = [];
  public itemRating: number = 0;
  public id: number;
  public rate: Rating;
  public pictureUrl: string = '';
  public eventsSubscription: any;



  constructor(
    public itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private commentService: CommentService,
    private ratingService: RatingService,
    private location: Location,
  ) {



    //подписка на роутер.
    //this.getCategories();
    //this.getValues();

    // this.searchValueChanged.pipe(debounceTime(1000))
    // .subscribe(() => {
    //   this.search();
    // });


  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.id = params['id'];
    // });
    this.resetForm();
    this.resetRating();
    //let id;


    //this.randomAuthor = this.authors[Math.ceil((Math.random() * this.authors.length) - 1)];
    this.route.paramMap.subscribe(paramMap => {
      this.id = Number(paramMap.get('id'));
      
    });

    

    this.router.events.subscribe((event) => {

      this.randomAuthor = this.authors[Math.ceil((Math.random() * this.authors.length) - 1)];
      this.commentService.getCommentsByItem(this.id)
        .subscribe(comments => {
          this.comments = comments;
        });

        this.itemService.getItemById(this.id)
        .subscribe(item => {
          this.itemDetail = item;
          this.getFile(item.name);
        });

      this.ratingService.getRatingsByItem(this.id)
        .subscribe(rating => {
          this.itemRating=0;
          rating.forEach((x) => {
            this.itemRating += x.ratingValue;
          });
          this.itemRating /= rating.length
        });
    });




  }

  ngOnDestroy(): void {
    //this.eventsSubscription.unsubscribe();
  }

  backClicked() {
    this.location.back();
  }

  public getFile(name: string) {
    this.itemService.getFileFromDisk(name).subscribe((file) => {
      //console.log(file["sizes"]);
      this.pictureUrl = file["href"];

    })
  }

  toggleRating(rating: number) {
    //console.log(rating);

    this.ratingData.itemId = this.id;
    this.ratingData.ratingValue = rating;
    this.ratingService.addRating(this.ratingData).subscribe(() => {
      this.toastr.success('Rating added succesfully');
      this.resetRating();
      console.log(rating);
      this.router.navigate([`/item-details/${this.id}`]);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });

  }

  public onSubmitComment(form: NgForm) {
    let itemId = this.itemDetail.id;
    this.commentService.addComment(form.form.value).subscribe(() => {
      this.toastr.success('Comment added succesfully');
      this.resetForm(form);
      //window.location.reload();
      this.router.navigate([`/item-details/${itemId}`]);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  private resetRating() {
    this.ratingData = {
      id: 0,
      itemId: 0,
      ratingValue: 0,
    };
  }

  private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.commentData = {
      id: 0,
      itemId: 0,
      commentAuthor: '',
      commentValue: '',
    };


  }

}
