import { Component, OnInit } from '@angular/core';
import { PagingInfo } from 'src/app/models/pagingInfo';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from './movie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent implements OnInit {
  movies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  totalResults: number = 0;
  pagingInfo: PagingInfo = {
    currentPage: 1,
    itemsPerPage: 18,
    totalItems: this.totalResults,
  };

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getTopRatedMovies(1);
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.movies = data;
    });
  }

  getTopRatedMovies(page:number) {
    this.movieService.getTopRatedMovies(page).subscribe((data: any) => {
      this.topRatedMovies = data.results;
      this.totalResults = data.total_results;
      console.log(this.totalResults);
    });
  }

  changePage(e:any) {
    this.getTopRatedMovies(e.pageIndex + 1);
  }
}
