import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../components/movie/movie';

@Pipe({
  name: 'movieFilter',
})
export class MovieFilterPipe implements PipeTransform {
  transform(movies: Movie[], filterText: string): Movie[] {
    filterText = filterText ? filterText.toLocaleLowerCase() : '';

    return filterText
      ? movies.filter(
          (m: Movie) => m.title.toLocaleLowerCase().indexOf(filterText) !== -1
        )
      : movies;
  }
}
