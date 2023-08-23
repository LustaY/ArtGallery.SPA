import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/_models/Item';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public formData: Item;
  public categories: any;

  constructor(public service: ItemService,
              private categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    let id;
    this.route.params.subscribe(params => {
      id = params['id'];
    });

    if (id != null) {
      this.service.getItemById(id).subscribe(item => {
        this.formData = item;
      }, err => {
        this.toastr.error('An error occurred on get the record.');
      });
    } else {
      this.resetForm();
    }

    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, err => {
      this.toastr.error('An error occurred on get the records.');
    });
  }

  public onSubmit(form: NgForm) {
    form.value.categoryId = Number(form.value.categoryId);
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  public insertRecord(form: NgForm) {
    let catId=this.formData.categoryId;
    this.service.addItem(form.form.value).subscribe(() => {
      this.toastr.success('Registration successful');
      this.resetForm(form);
      //this.location.back();
      this.router.navigate([`/items/${catId}`]);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  public updateRecord(form: NgForm) {
    let catId=this.formData.categoryId;
    this.service.updateItem(form.form.value.id, form.form.value).subscribe(() => {
      this.toastr.success('Updated successful');
      this.resetForm(form);
      this.router.navigate([`/items/${catId}`]);
    }, () => {
      this.toastr.error('An error occurred on update the record.');
    });
  }

  public cancel() {
    this.location.back();
  }

  private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.formData = {
      id: 0,
      name: '',
      author: '',
      description: '',
      price: null,
      location: null,
      categoryId: 0,
    };
  }
}