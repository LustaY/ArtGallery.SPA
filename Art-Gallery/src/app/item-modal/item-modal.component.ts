import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-modal',
  templateUrl: './item-modal.component.html',
  styleUrls: ['./item-modal.component.css']
})
export class ItemModalComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ItemModalComponent>,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}
