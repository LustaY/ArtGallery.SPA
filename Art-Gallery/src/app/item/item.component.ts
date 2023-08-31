import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/_services/category.service';
import { Location } from '@angular/common';
import { ItemModalComponent } from '../item-modal/item-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  public formData: any;
  public categories: any;
  public filePath: any;
  public file: any | null = null
  public itemsCount: number = 0;
  public picUrl: string;

  constructor(
    public itemService: ItemService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<ItemModalComponent>,) {

  }

  ngOnInit() {
    this.resetForm();

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

  onChange(event: any) {
    const file: File = event.target.files[0]
    if (file) {
      this.file = file
      this.itemService.getUploadLink(this.formData.name).subscribe((link) => {
        this.itemService.uploadFileOnDisk(link['href'], this.file).subscribe(() => {
          this.itemService.getFileFromDisk(this.formData.name).subscribe((getlink) => {
            this.formData.pictureUrl = getlink["href"];
            //console.log(this.formData.pictureUrl);
          })
        });
      })
      //console.log(this.formData.name)

    }
  }

  public insertRecord(form: NgForm) {
    let catId = this.formData.categoryId;
    //form.value.pictureUrl=this.uploadFile();
    //console.log(form.value.pictureUrl);
    this.itemService.addItem(form.form.value).subscribe(() => {
      this.toastr.success('Registration successful');
      // this.itemService.getItems().subscribe((items) => {
      //   console.log(items);
      //   if (items.length > 1) {
      //     this.itemsCount = items.sort((a, b) => {
      //       if (a.id < b.id) return -1;
      //       else if (a.id > b.id) return 1;
      //       else return 0;
      //     })[items.length - 1].id;
      //     console.log(this.itemsCount);
      //   }
      //   else if (items.length = 1) {
      //     this.itemsCount = items[1].id;
      //     console.log(this.itemsCount);
      //   }
        
      // })
      this.resetForm(form);
        this.dialogRef.close();
        this.router.navigate([`/items/${catId}/`]);

    }, () => {
      this.toastr.error('An error occurred on insert the record.');
    });
  }

  public updateRecord(form: NgForm) {
    let catId = this.formData.categoryId;
    this.itemService.updateItem(form.form.value.id, form.form.value).subscribe(() => {
      this.toastr.success('Updated successful');
      this.resetForm(form);
      this.router.navigate([`/items/${catId}`]);
    }, () => {
      this.toastr.error('An error occurred on update the record.');
    });
  }

  public cancel() {
    this.dialogRef.close();
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
      pictureUrl: '',
      minipictureUrl: '',
    };
  }
}