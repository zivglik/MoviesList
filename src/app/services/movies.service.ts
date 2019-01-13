import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Observable, throwError,from } from 'rxjs';
import { map, catchError,mergeMap,tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  apiUrl: string =  "https://www.omdbapi.com";
  apikey: string  = "cf43f6db";
  Movies : Movie[];

  constructor(private http : HttpClient ) {
    
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET,POST,PUT",
      })
  }; 



  addMovie (movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apiUrl}/Movie`, movie, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  updateMovie (movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apiUrl}/Movie`, movie, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }


  deleteMovie(id : string): void {
  
    var apiParams : string  = "/delete?id="+id+"&apikey="+this.apikey;
    let url : string =  `${this.apiUrl}${apiParams}`;
    this.http.get(url).pipe().subscribe(),
    catchError(this.handleError);
  }


  getListMovies(): Observable<Movie[]> {
  
    var apiParams : string  = "?s=Home&page=1&plot=short&type=movie&apikey="+this.apikey;
    let url : string =  `${this.apiUrl}${apiParams}`;
  
    return this.http.get(url).pipe(
      map((data) => {
        return data["Search"];
    }),
    catchError(this.handleError));
  }

    getItems(Movies: Movie[]): Observable<Movie> {
      return from(Movies).pipe(
        mergeMap((movie : Movie, index) => {
            return <Observable<Movie>> this.http.get( this.apiUrl + "?i="+movie.imdbID+"&apikey="+this.apikey);
          }
        )
      );
    }

    getMovieByTitle(title:string): Observable<Movie>  {
      var apiParams : string  = "?t="+title+"&apikey="+this.apikey;
        return this.http.get(this.apiUrl + apiParams).pipe(
          map((res : Movie) => {
            return res;
        }));
    }

  


    private handleError(error: HttpErrorResponse) {
      console.log(error);
     
      // return an observable with a user friendly message
      return throwError('Error! something went wrong.');
    }

  }

