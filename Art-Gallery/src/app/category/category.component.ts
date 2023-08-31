import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/_models/Category';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';
import { CategoryModalComponent } from '../category-modal/category-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public formData: any;
  public categoriesCount:number;
  

  constructor(public categoryService: CategoryService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<CategoryModalComponent>,
              ) { }

  ngOnInit() {
    this.resetForm();
    this.getCategories();
  }

 private resetForm(form?: NgForm) {
    if (form != null) {
      form.form.reset();
    }

    this.formData = {
      id: 0,
      name: '',
      description: ''
    };
  }

  public getCategories(){
    this.categoryService.getCategories().subscribe((categories)=>{
      this.categoriesCount=categories.length;
    })
  }
  public onSubmit(form: NgForm) {
    if (form.value.id === 0) {
      this.insertRecord(form);
    } else {
      this.updateRecord(form);
    }
  }

  public insertRecord(form: NgForm) {
    this.categoryService.addCategory(form.form.value).subscribe(() => {
      this.toastr.success('Registration successful');
      this.resetForm(form);
      this.dialogRef.close();
      this.router.navigate([`/items/${this.categoriesCount+1}`]);
    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  public updateRecord(form: NgForm) {
    this.categoryService.updateCategory(form.form.value.id, form.form.value).subscribe(() => {
      this.toastr.success('Updated successful');
      this.resetForm(form);
      this.router.navigate(['/']);
    }, () => {
      this.toastr.error('An error occurred on update the record.');
    });
  }

  public cancel() {
    this.dialogRef.close();
    //this.router.navigate(['']);
  }
}