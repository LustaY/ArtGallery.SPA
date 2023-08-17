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

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  categories: Category[]=[];
  searchIcon = faSearch;
  faHamburger = faHamburger;

  userIcon= faUser;
  showLeftNav: boolean = true;

  constructor(private categoryService: CategoryService){}
  ngOnInit():void{
    this.getCategories();
  }

  getCategories():void{
    this.categoryService.getCategories()
    .subscribe(categories => this.categories = categories);

  }
  showAndHideLeftNav() {
    this.showLeftNav = !this.showLeftNav;
  }
}
