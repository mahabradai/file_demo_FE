import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './uploadFile/home/home.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'uploadFile/home',
    pathMatch: 'full'
  },
  {
    path: 'uploadFile/home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
