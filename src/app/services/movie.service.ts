import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../components/movie/movie';
import { Credits } from '../models/credits';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl: string = 'https://api.themoviedb.org/3/movie/';
  apiKey: string = 'bdcb28035216b328bd4a7ff0b18e718e';
  language: string = 'tr-TR';

  constructor(private httpClient: HttpClient) {}

  getMovieById(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(
      `${this.apiUrl}/${id}?api_key=${this.apiKey}&language=${this.language}`
    );
  }

  searchMovies(searchValue: string): Observable<any> {
    return this.httpClient.get(`
    https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=${this.language}&query=${searchValue}&page=1`);
  }

  getMovieCredits(id: number): Observable<Credits> {
    return this.httpClient.get<Credits>(
      `${this.apiUrl}/${id}/credits?api_key=${this.apiKey}&language=${this.language}`
    );
  }

  getBackdropImages(id: number): Observable<Movie> {
    return this.httpClient.get<Movie>(
      `${this.apiUrl}/${id}/images?api_key=${this.apiKey}`
    );
  }

  getPopularMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.apiUrl}popular?api_key=${this.apiKey}&language=${this.language}&page=1`
    );
  }

  getTopRatedMovies(page:number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.apiUrl}top_rated?api_key=${this.apiKey}&page=${page}&language=en-US`
    );
  }

  getNowPlayingMovies(page: number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.apiUrl}now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=US`
    );
  }
}
