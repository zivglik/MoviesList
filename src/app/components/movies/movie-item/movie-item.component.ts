import { Component, OnInit,Input,Output , EventEmitter} from '@angular/core';
import { Movie } from '../../../models/movie';

@Component({
  selector: '[app-movie-item]',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movie : Movie;

  @Output() onSelectedDeleteMovie = new EventEmitter<Movie>();
  @Output() onSelectedEditMovie = new EventEmitter<Movie>();
  constructor() { }

  ngOnInit() {
  }

  SelectedDeleteMovie(){
    this.onSelectedDeleteMovie.emit(this.movie);
  }

  SelectedEditMovie(){
    this.onSelectedEditMovie.emit(this.movie);
  }

}
