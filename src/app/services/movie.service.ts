import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../components/movie/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  apiUrl: string = 'https://api.themoviedb.org/3/movie/';
  apiKey: string = 'bdcb28035216b328bd4a7ff0b18e718e';
  language: string = 'tr-TR';

  constructor(private httpClient: HttpClient) {}

  getPopularMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.apiUrl}popular?api_key=${this.apiKey}&language=${this.language}&page=1`
    );
  }

  getNowPlayingMovies(page:number): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(
      `${this.apiUrl}now_playing?api_key=${this.apiKey}&page=${page}&language=${this.language}&region=US`
    );
  }
}
