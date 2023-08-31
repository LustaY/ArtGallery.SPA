import { NgModule } from '@angular/core';
import { NgbModule, NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { ScrollingModule } from '@angular/cdk/scrolling';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemService } from './_services/item.service';
import { CategoryService } from './_services/category.service';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogModalComponent } from './log-modal/log-modal.component';
import { AngularMaterialModule } from './angular-material.module';
import { DatePipe } from '@angular/common';
import { ParamMap, Router, RouterModule } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { CategoryModalComponent } from './category-modal/category-modal.component';
import { ItemModalComponent } from './item-modal/item-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryListComponent,
    ItemListComponent,
    ItemComponent,
    LogModalComponent,
    DetailsComponent,
    CategoryModalComponent,
    ItemModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    AngularMaterialModule,
    DatePipe,
    RouterModule,
    NgbRatingModule,
    NgxPaginationModule,
    ScrollingModule

  ],
  providers: [
    ItemService,
    CategoryService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
