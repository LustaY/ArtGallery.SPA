import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public items: any;
  public listComplet: any;
  public searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router,
              private service: ItemService,
              private toastr: ToastrService,
              private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit() {
    this.getValues();

    this.searchValueChanged.pipe(debounceTime(1000))
    .subscribe(() => {
      this.search();
    });
  }

  private getValues() {

    this.service.getItems().subscribe(items => {
      this.items = items;
      this.listComplet = items;
    });
  }

  public addItem() {
    this.router.navigate(['/item']);
  }

  public editItem(itemId: number) {
    this.router.navigate(['/item/' + itemId]);
  }

  public deleteItem(itemId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this item?')
      .then(() =>
        this.service.deleteItem(itemId).subscribe(() => {
          this.toastr.success('The item has been deleted');
          this.getValues();
        },
          err => {
            this.toastr.error('Failed to delete the item.');
          }))
      .catch(() => '');
  }

  public searchItems() {
    this.searchValueChanged.next(void 0);
  }

  private search() {
    if (this.searchTerm !== '') {
      this.service.searchItemsWithCategory(this.searchTerm).subscribe(item => {
        this.items = item;
      }, error => {
        this.items = [];
      });
    } else {
      this.service.getItems().subscribe(items => this.items = items);
    }
  }
}