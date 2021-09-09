import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cast } from 'src/app/models/cast';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../movie/movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css'],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  casts: Cast[] = [];
  backdrops: any = [];
  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getMovieById(params['id']);
      this.getCast(params['id']);
      this.getBackdropImages(params['id']);
    });
  }

  getMovieById(id: number) {
    this.movieService.getMovieById(id).subscribe((data) => {
      this.movie = data;
    });
  }

  getCast(id: number) {
    this.movieService.getMovieCredits(id).subscribe((data: any) => {
      this.casts = data.cast;
    });
  }

  getBackdropImages(id: number) {
    this.movieService.getBackdropImages(id).subscribe((data: any) => {
      this.backdrops = data.backdrops;
    });
  }
}
