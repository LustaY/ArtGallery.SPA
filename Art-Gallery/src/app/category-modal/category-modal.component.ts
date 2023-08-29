import { Component, OnInit } from '@angular/core';
import {
  MatDialogRef
} from '@angular/material/dialog';

@Component({
  selector: 'app-category-modal',
  templateUrl: './category-modal.component.html',
  styleUrls: ['./category-modal.component.css']
})
export class CategoryModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CategoryModalComponent>,
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() { }
}

