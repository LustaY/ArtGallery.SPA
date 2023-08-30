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
    private ratingService: RatingService
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
    this.router.events.subscribe((event) => {
      this.route.paramMap.subscribe(paramMap => {
        this.id = Number(paramMap.get('id'));
        this.randomAuthor = this.authors[Math.ceil((Math.random() * this.authors.length) - 1)];
        this.commentService.getCommentsByItem(this.id)
          .subscribe(comments => {
            this.comments = comments;
          }, err => {
            //if (event instanceof NavigationEnd)
              this.toastr.error('No comments on this Item');
          });
  
      this.itemService.getItemById(this.id)
        .subscribe(item => {
          this.itemDetail = item;
          this.getFile(item.pictureUrl);
        });
  
  
  
      this.ratingService.getRatingsByItem(this.id)
        .subscribe(rating => {
          rating.forEach((x) => {
            this.itemRating += x.ratingValue;
          });
          this.itemRating /= rating.length
        });
      });
    });
    

    
  }

  ngOnDestroy(): void {
    //this.eventsSubscription.unsubscribe();
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
    //form.value.categoryId = Number(form.value.categoryId);
      this.insertRecord(form);
  }

  public insertRecord(form: NgForm) {
    // let catId = this.formData.categoryId;
    // this.itemService.addItem(form.form.value).subscribe(() => {
    //   this.toastr.success('Registration successful');
    //   this.resetForm(form);
    //   //this.location.back();
    //   this.router.navigate([`/items/${catId}`]);
    // }, () => {
    //   this.toastr.error('An error occurred on insert the record.');
    // });
    //let itemId = form.form.valu;
    let itemId = this.itemDetail.id;
    console.log(form.form.value);
    this.commentService.addComment(form.form.value).subscribe(() => {
      this.toastr.success('Comment added succesfully');
      this.resetForm(form);
      //window.location.reload();
      this.router.navigate([`/item-details/${itemId}`]);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  public updateRecord(form: NgForm) {
    // let catId = this.formData.categoryId;
    // this.itemService.updateItem(form.form.value.id, form.form.value).subscribe(() => {
    //   this.toastr.success('Updated successful');
    //   this.resetForm(form);
    //   this.router.navigate([`/items/${catId}`]);
    // }, () => {
    //   this.toastr.error('An error occurred on update the record.');
    // });
  }

  public cancel() {
    //this.location.back();
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
