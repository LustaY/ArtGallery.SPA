import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { LogService } from '../_services/log.service';
@Component({
  selector: 'app-log-modal',
  templateUrl: './log-modal.component.html',
  styleUrls: ['./log-modal.component.css'],
})
export class LogModalComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LogModalComponent>,
    public logService: LogService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  ngOnInit() {}
}