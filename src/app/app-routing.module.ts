import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserNewComponent} from './user-new/user-new.component';
import {GetDataComponent} from './get-data/get-data.component';
import {UpdateDataComponent} from './update-data/update-data.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  {path: 'new', component: UserNewComponent},
  {path: 'get', component: GetDataComponent},
  {path: 'update', component: UpdateDataComponent},
  {path: 'user/:id', component: UserComponent},
  {path: '', redirectTo: 'get', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
