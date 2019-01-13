import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterState,ActivatedRoute,ParamMap  } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'HeroloMovies';

 
  state : RouterState;
  constructor(private router: Router) {
    


  }



}
