import { Component } from '@angular/core';


import { MatDialog } from '@angular/material/dialog';
import { LogModalComponent } from './log-modal/log-modal.component';
import { CategoryService } from './_services/category.service';
import { Category } from './_models/Category';
import { ItemService } from './_services/item.service'; 
import { ActivatedRoute, Router} from '@angular/router';
import {
  faUser,
} from "@fortawesome/free-solid-svg-icons";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Art-Gallery';
  categories: Category[]=[];
  showLeftNav: boolean = true;
  userIcon= faUser;
  name: string;
  color: string;

  constructor(
    private categoryService: CategoryService,
     private service: ItemService,
     private route: ActivatedRoute,
     private router: Router,
     public dialog: MatDialog,
     ){}

 
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

  public catOpen(id: number){
    console.log(id);
    this.router.navigate(["/items/",id]);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LogModalComponent, {
      width: '80%',
    });
  }
}
