import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule} from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ModalModule } from 'ngx-bootstrap';
import { TitleFormatPipe } from './helpers/pipes';

//Component 
import { AppComponent } from './app.component';
import { MovieItemComponent } from './components/movies/movie-item/movie-item.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';

//Component popups
import { PopupDeleteComponent } from './components/movies/popup-delete/popup-delete.component';
import { PopupAddEditComponent } from './components/movies/popup-add-edit/popup-add-edit.component';



@NgModule({
  declarations: [
    AppComponent,
    MovieItemComponent,
    MoviesListComponent,
    PopupDeleteComponent,
    PopupAddEditComponent,
    TitleFormatPipe
  ],
  entryComponents: [PopupDeleteComponent,PopupAddEditComponent],
  imports: [
    ModalModule.forRoot(),
    AngularFontAwesomeModule,
    CommonModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
