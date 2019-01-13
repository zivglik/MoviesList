import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MoviesListComponent }   from './components/movies/movies-list/movies-list.component';


const routes: Routes = [
  { path: 'movies',  component: MoviesListComponent },
  { path: '**',      component: MoviesListComponent }
];



@NgModule({

    imports: [
    CommonModule,
    RouterModule.forRoot(routes,{useHash:true}),
  ],
  exports: [ RouterModule ],
  declarations: []

})
export class AppRoutingModule { }



