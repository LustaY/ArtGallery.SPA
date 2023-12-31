import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ItemListComponent } from './item-list/item-list.component';
import { ItemComponent } from './item/item.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
    //{ path: 'home', component: HomeComponent },
    { path: 'items/:id', component: ItemListComponent },
    { path: 'item-details/:id', component: DetailsComponent },
    { path: 'item', component: ItemComponent },
    { path: 'item/:id', component: ItemComponent },
    { path: 'categories', component: CategoryListComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'category/:id', component: CategoryComponent },
    { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: "reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
