import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { NavComponent } from './nav/nav.component';
const routes: Routes = [
    //{ path: 'home', component: HomeComponent },
    { path: 'items/:id', component: ItemListComponent },
    { path: 'item', component: ItemComponent },
    { path: 'item/:id', component: ItemComponent },
    { path: 'categories', component: CategoryListComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: 'nav', component: NavComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
