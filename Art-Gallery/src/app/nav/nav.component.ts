import { Component } from '@angular/core';
import {
  faBook,
  faUser,
  faContactBook,
  faSearch,
  faTrowel,
  faHamburger,
  faAmbulance,
  faAnchorCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { CategoryService } from '../_services/category.service';
import { Category } from '../_models/Category';
import { ItemService } from '../_services/item.service'; 
import { ActivatedRoute} from '@angular/router';
import { ItemListComponent } from '../item-list/item-list.component'; 
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { Location } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  public items: any;
  public listComplet: any;
  public searchTerm: string;
  public searchValueChanged: Subject<string> = new Subject<string>();

  categories: Category[]=[];
  searchIcon = faSearch;
  faHamburger = faHamburger;


  userIcon= faUser;
  showLeftNav: boolean = true;

  constructor(
    private categoryService: CategoryService,
     private service: ItemService,
     private route: ActivatedRoute,
     ){}
    
  ngOnInit():void{
    this.getCategories();
    //this.getValues();

    // this.searchValueChanged.pipe(debounceTime(1000))
    // .subscribe(() => {
    //   this.search();
    // });
  }

  // private getValues() {

  //   this.service.getItems().subscribe(items => {
  //     this.items = items;
  //     this.listComplet = items;
  //   });
  // }

  getCategories():void{
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);

  }
  showAndHideLeftNav() {
    this.showLeftNav = !this.showLeftNav;
  }

  // public searchItems() {
  //   this.searchValueChanged.next(void 0);
  // }

  // private search() {
  //   const id = Number(this.route.snapshot.paramMap.get('id'));
  //   if (this.searchTerm !== '') {
  //     this.service.searchItemsWithCategory(this.categories[id].name).subscribe(item => {
  //       this.items = item;
  //     }, error => {
  //       this.items = [];
  //     });
  //   } else {
  //     this.service.getItems().subscribe(items => this.items = items);
  //   }
  // }
}
