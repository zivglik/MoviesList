import { Component, OnInit ,Input,TemplateRef } from '@angular/core';
import { Movie }                                from '../../../models/movie';
import { MoviesService }                        from '../../../services/movies.service';
import { BsModalService, BsModalRef }           from 'ngx-bootstrap/modal';
import { PopupDeleteComponent }                 from '../popup-delete/popup-delete.component';
import { PopupAddEditComponent }                from '../popup-add-edit/popup-add-edit.component';

@Component({
  selector:     'app-movies-list',
  templateUrl:  './movies-list.component.html',
  styleUrls:    ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies            : Movie[];
  movieslist        : Movie[] = [];
  itemSelectEdit    : Movie;
  itemSelectDelete  : string = "";
  modalRef          : BsModalRef;

  @Input() movie : Movie;

  constructor(private moviesService: MoviesService,private BsModalService: BsModalService) 
    { }

  ngOnInit() {
    this.getListMovies();
  }
    
  getItemsForIds(movies : Movie[]) {
    this.moviesService
      .getItems(movies)
      .subscribe(item => {
        this.movieslist.push(item);
      });
  }

  getListMovies(): void {

       //if(localStorage.getItem("listmovies"))
       //{
       // this.movieslist = JSON.parse(localStorage.getItem("listmovies"))["Search"];
       //}
       // else
       //{
            this.moviesService.getListMovies().subscribe(
              (res: Movie[]) => {
                this.movies = res as Array<Movie>;
                  this.getItemsForIds(this.movies);
                },
                (err) => {},
               // () =>  localStorage.setItem("listmovies", this.movieslist.toString())
                );
        //}
      }


      onSelectedDeleteMovie(movie : Movie) : void
      {
        const initialState = {
          itemSelectDelete : this.itemSelectDelete,
          Title : movie.Title
        }

        this.modalRef = this.BsModalService.show(PopupDeleteComponent, {initialState});
      }

      onSelectedEditMovie(movie:Movie)
      {
        this.itemSelectEdit = movie;
        const initialState = {
          movie : movie,
          Action : "Edit"
        }
        this.modalRef = this.BsModalService.show(PopupAddEditComponent, {initialState});
      }

 
      onSelectedAddMovie()
      {
        let movie : Movie = {Title:"",Year:0,imdbID:"",Type:"",Poster:"",Runtime:0,Genre:"",Director:""}

        const initialState = {
          movie : movie,
          Action : "Add"
        }

        this.modalRef = this.BsModalService.show(PopupAddEditComponent, {initialState});
      }

  }

  


