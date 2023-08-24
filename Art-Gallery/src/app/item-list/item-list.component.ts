import { Component, OnInit } from '@angular/core';
import { ParamMap, Router } from '@angular/router';
import { ItemService } from 'src/app/_services/item.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from 'src/app/_services/confirmation-dialog.service';
import { Subject, switchMap } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  public items: any;
  categories: Category[]=[];
  
  public catId: any;
  public listComplet: any;
  public searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  constructor(private router: Router,
              private itemService: ItemService,
              private toastr: ToastrService,
              private confirmationDialogService: ConfirmationDialogService,
              private categoryService: CategoryService,
              private route: ActivatedRoute,) {
                
               }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      const id = Number(paramMap.get('id'));    // get param from dictonary
      this.itemService.getItemsByCategory(id).subscribe(item => {
        this.items = item;
      }, error => {
        this.items = [];
      });                    // load your data
  });
    //подписка на роутер.
    //this.getCategories();
    //this.getValues();

    // this.searchValueChanged.pipe(debounceTime(1000))
    // .subscribe(() => {
    //   this.search();
    // });
    

  }

  private getValues() {
    
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.itemService.getItemsByCategory(id).subscribe(item => {
      this.items = item;
    }, error => {
      this.items = [];
    }); 
    

    // this.service.getItems().subscribe(items => {
    //   this.items = items;
    //   this.listComplet = items;
    // });
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
        this.itemService.deleteItem(itemId).subscribe(() => {
          this.toastr.success('The item has been deleted');
          this.getValues();
        },
          err => {
            this.toastr.error('Failed to delete the item.');
          }))
      .catch(() => '');
  }

  // public searchItems() {
  //   this.searchValueChanged.next(void 0);
  // }
  
  getCategories():void{
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);
  }

  // private search() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   const catName = String(this.categories[id].name);
  //   if (this.searchTerm !== '') {
  //     this.service.searchItemsWithCategory(catName).subscribe(item => {
  //       this.items = item;
  //     }, error => {
  //       this.items = [];
  //     });
  //   } else {
  //     this.service.getItems().subscribe(items => this.items = items);
  //   }
  // }
}