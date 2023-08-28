import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';
import { Location } from '@angular/common';
import { CommentService } from '../_services/comment.service';
import { Comment } from '../_models/Comment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  public commentData: Comment;
  public categories: any;
  public itemDetail: any;
  public authors: string[] = [
    'Mike',
    'Jhon',
    'Sigizmund',
    'Geralt',
    'Hetfield',
    'Max'
  ];
  public randomAuthor: string = 'Sam';
  public comments: Comment[] = [];


  constructor(
    public itemService: ItemService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private toastr: ToastrService,
    private commentService: CommentService,
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
    this.resetForm();
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.randomAuthor = this.authors[Math.ceil((Math.random() * this.authors.length) - 1)];
    this.router.events.subscribe(events => {
      this.itemService.getItemById(id)
        .subscribe(item => {
          this.itemDetail = item;
        });
      this.commentService.getCommentsByItem(id)
        .subscribe(comment => {
          this.comments = comment;
        });
    });




    // if (id != null) {
    //   this.itemService.getItemById(id).subscribe(item => {
    //     this.itemDetail = item;
    //   }, err => {
    //     this.toastr.error('An error occurred on get the record.');
    //   });
    // } else {
    //   //this.resetForm();
    // }

    // if (id != null) {
    //   this.commentService.getCommentsByItem(id).subscribe(comment => {
    //     this.comments = comment;
    //   }, err => {
    //     this.toastr.error('An error occurred on get the record.');
    //   });
    // } else {
    //   this.resetForm();
    // }

    // if (id != null) {
    //   this.commentService.getById(id).subscribe(comment => {
    //     //this.formData = comment;
    //     this.commentData = comment;
    //   }, err => {
    //     this.toastr.error('An error occurred on get the record.');
    //   });
    // } else {
    //   this.resetForm();
    // }

    // this.categoryService.getCategories().subscribe(categories => {
    //   this.categories = categories;
    // }, err => {
    //   this.toastr.error('An error occurred on get the records.');
    // });
  }


  public onSubmit(form: NgForm) {
    //form.value.categoryId = Number(form.value.categoryId);
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
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
