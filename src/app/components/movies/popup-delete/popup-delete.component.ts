import { Component, OnInit,Input} from '@angular/core';
import {  BsModalRef } from 'ngx-bootstrap/modal';
import { MoviesService } from '../../../services/movies.service';

@Component({
  selector: '[app-popup-delete]',
  templateUrl: './popup-delete.component.html',
  styleUrls: ['./popup-delete.component.scss']
})

export class PopupDeleteComponent implements OnInit {
  @Input() itemSelectDelete : string;
  @Input() Title : string;

  constructor (private moviesService : MoviesService ,public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  closePopupDeleteMovie() : void
  {
    this.bsModalRef.hide();
  }
  actionDeleteMovie():void
  {
    this.moviesService.deleteMovie(this.itemSelectDelete);
    this.closePopupDeleteMovie();
  }
 
}
