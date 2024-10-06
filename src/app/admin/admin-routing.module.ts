import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PostCategoryComponent } from './Components/post-category/post-category.component';
import { PostProductComponent } from './Components/post-product/post-product.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path :'dashboard', component :DashboardComponent},
  { path : 'category',component : PostCategoryComponent},
  { path : 'product', component :PostProductComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
