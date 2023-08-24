import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemService } from './_services/item.service';
import { CategoryService } from './_services/category.service';
import { ConfirmationDialogService } from './_services/confirmation-dialog.service';
import { CategoryComponent } from './category/category.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NavComponent } from './nav/nav.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogModalComponent } from './log-modal/log-modal.component';
import { AngularMaterialModule } from './angular-material.module';
import { DatePipe } from '@angular/common';
import { ParamMap, Router, RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    CategoryListComponent,
    ItemListComponent,
    ItemComponent,
    HomeComponent,
    ConfirmationDialogComponent,
    NavComponent,
    LogModalComponent
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
    
  ],
  providers: [
    ItemService,
    CategoryService,
    ConfirmationDialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
