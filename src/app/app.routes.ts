import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {FirstComponent} from './first/first.component';
import {SecondComponent} from './second/second.component';
import {BookFormComponent} from './book-form/book-form.component';

export const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component: HomeComponent},
  {path:'books', component: BookListComponent},
  {path:'books/:isbn', component: BookDetailsComponent,
    children:[
      {path:'first', component: FirstComponent},
      {path:'second', component: SecondComponent},
    ]
  },
  {path:'admin', component: BookFormComponent},
  {path:'admin/:isbn', component: BookFormComponent},
];
