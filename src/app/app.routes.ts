import { Routes } from '@angular/router';
import { Main } from './page/main/main';
import { Details } from './page/details/details';
import { Manage } from './page/manage/manage';

export const routes: Routes = [
     {path: '', component: Main}
     ,{path:'manage', component: Manage}
     ,{path: 'manage/:funtion', component: Manage}
    ,{path: 'details/:id', component: Details}
];
