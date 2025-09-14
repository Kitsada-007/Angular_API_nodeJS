import { Routes } from '@angular/router';
import { Main } from './page/main/main';
import { Details } from './page/details/details';
import { Manage } from './page/manage/manage';
import { Edit } from './page/edit/edit';

export const routes: Routes = [
     {path: '', component: Main}
     ,{path:'manage', component: Manage}
     ,{path: 'edit/:id', component: Edit}
    ,{path: 'details/:id', component: Details}
];
