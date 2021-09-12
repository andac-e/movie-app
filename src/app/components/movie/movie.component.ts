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
  searchResults: Movie[] = [];
  totalResults: number = 0;
  pagingInfo: PagingInfo = {
    currentPage: 1,
    itemsPerPage: 18,
    totalItems: this.totalResults,
  };
  filterText: string = '';
  loading: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getTopRatedMovies(1);
  }

  getPopularMovies() {
    this.movieService.getPopularMovies().subscribe((data) => {
      this.movies = data;
      this.loading = false;
    });
  }

  getTopRatedMovies(page: number) {
    this.movieService.getTopRatedMovies(page).subscribe((data: any) => {
      this.topRatedMovies = data.results;
      this.totalResults = data.total_results;
      this.loading = false;
    });
  }

  changePage(e: any) {
    this.getTopRatedMovies(e.pageIndex + 1);
  }

  searchMovies() {
    this.movieService.searchMovies(this.filterText).subscribe((data) => {
      this.searchResults = data.results;
    });
  }
}
