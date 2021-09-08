import { Component, OnInit } from '@angular/core';
import {
  trigger,
  transition,
  animate,
  style,
  state,
} from '@angular/animations';
import { Movie } from '../movie/movie';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class SliderComponent implements OnInit {
  current: number = 0;
  movies: Movie[] = [];
  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getNowPlayingMovies(1);
    this.sliderTimer();
  }

  getNowPlayingMovies(page: number) {
    this.movieService.getNowPlayingMovies(page).subscribe((data:any) => {
      this.movies = data.results;
      console.log(data);
    });
  }

  sliderTimer() {
    setInterval(() => {
      this.current = ++this.current % this.movies.length;
    }, 5000);
  }
}
