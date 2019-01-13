import { Component, OnInit,Input}              from '@angular/core';
import { Movie }                               from '../../../models/movie';
import { FormGroup, Validators ,FormBuilder }  from '@angular/forms';
import { BsModalRef }                          from 'ngx-bootstrap/modal';
import { MoviesService }                       from '../../../services/movies.service';
import { AbstractControl,ValidatorFn }         from '@angular/forms';
@Component({
  selector:     '[app-popup-add-edit]',
  templateUrl:  './popup-add-edit.component.html',
  styleUrls:    ['./popup-add-edit.component.scss']
})
export class PopupAddEditComponent implements OnInit {
  @Input() Action:string;
  @Input() movie : Movie;

  movieForm: FormGroup;
  submitted = false;
  settimeoutObj:any;
  ctitle:string;

  constructor(
              private moviesService : MoviesService ,
              public  bsModalRef    : BsModalRef,
              private formBuilder   : FormBuilder
            ) { }

  ngOnInit() {

    this.ctitle = this.movie.Title;

    this.movieForm = this.formBuilder.group({
      imdbID:   [this.movie.imdbID],
      Title:    [this.movie.Title, [Validators.required, this.existNameTitle()]],
      Year:     [this.movie.Year,  [this.validYear()]],
      Type:     [this.movie.Type, Validators.required],
      Poster:   [this.movie.Poster, Validators.required],
      Runtime:  [this.movie.Runtime, Validators.required],
      Genre:    [this.movie.Genre, Validators.required],
      Director: [this.movie.Director, Validators.required],
  
  });

  }
     

  closePopupEditMovie() : void
  {
    this.bsModalRef.hide();
  }

  onSubmitActionEditMovie() {
 
    if(this.Action=="Add")
    {
      this.onSubmitActionAddMovie();
    }
    else
    {
        this.submitted = true;
        if (this.movieForm.invalid) {
            return;
        }
        this.moviesService.updateMovie(this.movie).subscribe();
        this.closePopupEditMovie();
    }
  }

  
  onSubmitActionAddMovie() {
    this.submitted = true;
    if (this.movieForm.invalid) {
        return;
    }
   
    this.moviesService.addMovie(this.movie).subscribe();
    this.closePopupEditMovie();
  }
 
  validYear() : ValidatorFn
  {
    
    return (control: AbstractControl): {[key: string]: any} | null => {
        const yearControl = control.value;

          var date = new Date();

          date.setFullYear(yearControl, 0, 1);
          if ((date.getFullYear() == yearControl) && (date.getMonth() == 0) && (date.getDate() == 1))
          {
            
            return  null;
          }
          else
          {
            
          return yearControl ? {'datevalid': true} : null;
          }
      };

      
  }//validYear END

  existNameTitle(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const titleControl = control.value;
  

      clearTimeout(this.settimeoutObj);
        if(titleControl!="")
       {
            this.settimeoutObj = setTimeout(()=>{   
                  this.moviesService.getMovieByTitle(titleControl).subscribe(res => {

                      if(res.hasOwnProperty('Title'))
                      {

                        if(titleControl.toLowerCase() != this.ctitle.toLowerCase()  
                        && String(res["Title"]).toLowerCase() === titleControl.toLowerCase())
                        { 
                          console.log("exist");
                          return titleControl ? {'exist':  true} : null;
                        } else {
                     
                          return  null;
                        }
                      }
                      else
                      {
                      
                        return  null;
                      }
                     
                  });

            }, 700);
        }
        else
        {
        
          return  null;
       
          
        }

       
      }//existNameTitle END


      
    }
    

 
     



}



 
