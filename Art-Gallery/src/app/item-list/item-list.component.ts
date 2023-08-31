import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
import { MatDialog } from '@angular/material/dialog';
import { ItemModalComponent } from '../item-modal/item-modal.component';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  public items: any;
  public pageItems: any;
  categories: Category[] = [];
  page: number = 1;
  itemsPerPage = 6;
  totalItems: any;
  categoryId: number;
  pictureUrl:string;


  public catId: any;
  public listComplet: any;
  public searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router,
    private itemService: ItemService,
    private toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
  ) {

  }

  ngOnInit() {


    this.route.paramMap.subscribe(paramMap => {
      this.page = 1;
      this.categoryId = Number(paramMap.get('id'));
      this.getItemsByCategory();
      this.getPage(this.page);    // get param from dictonary
      // load your data
    });
    //подписка на роутер.
    this.getCategories();
    //this.getValues();

    this.searchValueChanged.pipe(debounceTime(1000))
      .subscribe(() => {
        this.search();
      });
  }

  public getFile(name: string) {
    this.itemService.getFileFromDisk(name).subscribe((file) => {
      //console.log(file["sizes"]);
      this.pictureUrl = file["href"];
    })
  }
  
  getItemsByCategory() {
    this.itemService.getItemsByCategory(this.categoryId).subscribe(item => {
      //this.items = item;
      this.totalItems = item.length;
      this.page = 1;
    }, error => {
      this.items = [];
    });
  }
  // private getValues() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   this.itemService.getItemsByCategory(id).subscribe(item => {
  //     this.items = item;
  //   }, error => {
  //     this.items = [];
  //   }); 


  // this.service.getItems().subscribe(items => {
  //   this.items = items;
  //   this.listComplet = items;
  // });
  //}

  public addItem() {
    const dialogRef = this.dialog.open(ItemModalComponent, {
      width: '60%',
    });
  }

  public viewDetails(itemId: number) {
    this.router.navigate(['/item-details/' + itemId]);
  }

  public deleteItem(itemId: number) {
    this.confirmationDialogService.confirm('Atention', 'Do you really want to delete this item?')
      .then(() =>
        this.itemService.deleteItem(itemId).subscribe(() => {
          this.toastr.success('The item has been deleted');
          //this.getValues();
        },
          err => {
            this.toastr.error('Failed to delete the item.');
          }))
      .catch(() => '');
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  public getPage(page: number) {
    this.itemService.getItemsByPage(this.categoryId, this.page, this.itemsPerPage)
      .subscribe((items) => {
        this.pageItems = items;
      })
  }

  public searchItems() {
    this.searchValueChanged.next(void 0);
  }

  private search() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.searchTerm !== '') {
      this.itemService.searchItemsWithCategory(this.searchTerm).subscribe(items => {
        this.pageItems = [];
        items.forEach((x) => {
          if (x.categoryId == id)
            this.pageItems.push(x);
        })
        this.totalItems = this.pageItems.length;
        this.page = 1;
      }, error => {
        this.pageItems = [];
      });
    } else {
      this.getItemsByCategory();
      this.getPage(this.page);
    }
  }
}