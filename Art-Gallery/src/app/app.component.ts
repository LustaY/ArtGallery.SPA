import { Component } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { LogModalComponent } from './log-modal/log-modal.component';
import { CategoryService } from './_services/category.service';
import { Category } from './_models/Category';
import { ItemService } from './_services/item.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { CategoryModalComponent } from './category-modal/category-modal.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Art-Gallery';
  categories: Category[] = [];
  showLeftNav: boolean = true;
  userIcon = faUser;
  faHamburger = faHamburger;
  name: string;
  color: string;

  constructor(
    private categoryService: CategoryService,
    private service: ItemService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
  ) { }


  ngOnInit(): void {
    this.router.events.subscribe(events => {
      this.getCategories();
    });
  }
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);

  }
  showAndHideLeftNav() {
    this.showLeftNav = !this.showLeftNav;
  }

  public catOpen(id: number) {
    this.router.navigate(["/items/", id]);
  }

  public addCategory() {
    const dialogRef = this.dialog.open(CategoryModalComponent, {
      width: '60%',
    });
    //this.router.navigate(["/category"]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogModalComponent, {
      width: '80%',
    });
  }
}
