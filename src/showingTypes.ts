// У вас є дві сутності - список фільмів і список категорій фільмів.
// Кожен фільм містить поля: назва, рік випуску, рейтинг, список нагород.
// Категорія містить поля: назва і фільми.
// У кожного списку є пошук за ім'ям (це, по суті, фільтрація),
//  у списку фільмів є додаткова фільтрація за роком випуску, рейтингом і нагородами.
// У нас визначено три типи фільтрів:
// Фільтр відповідності має поле filter
// Фільтр діапазону має поле filter і filterTo
// Фільтр пошуку за значеннями має поле values
// Кожен список містить стан його фільтрів, який може бути змінений
// тільки методом applySearchValue або applyFiltersValue (за наявності додаткових фільтрів)
// Вам необхідно подумати про поділ вашого коду на різні сутності,
// інтерфеси і типи, щоб зробити ваше рішення типобезпечним. Реалізація всіх методів не є необхідною - це за бажанням.




interface Movie {
  name: string;
  year: number;
  rate: number;
  awards: string[];
}

interface Category {
  name: string;
  movies: Movie[];
}
interface IBaseList <T> {
  searchByName: (key: string)=>T| undefined
}

interface IMovieList  extends IBaseList <Movie> {
  filterByYear(filter: number, filterTo:number):Movie[];
  filterByRating(filter: number, filterTo:number):Movie[];
  filterByRewards(values: string[]):Movie[];
}

interface ICategoryList extends IBaseList <Category> {
}

class MovieList implements IMovieList{
  private movies: Movie[];
  constructor(movies:Movie[]){
    this.movies= movies
  }

  searchByName(key: string): Movie | undefined {
    return this.movies.find(movie => movie.name === key);
  }

  filterByYear(filter: number, filterTo: number): Movie[] {
    return this.movies.filter(movie => movie.year >= filter && movie.year <= filterTo);
  }

  filterByRating(filter: number, filterTo: number): Movie[] {
    return this.movies.filter(movie => movie.rate >= filter && movie.rate <= filterTo);
  }

  filterByRewards(values: string[]): Movie[] {
    return this.movies.filter(movie => {
      return values.some(value => movie.awards.includes(value));
    });
  }
                                                  
}

class CategoryList implements IMovieList{
  private categories: Category[];
}
const filter = (arr: Movie[] | Category[], data: string) => {
  return arr.filter(i => i.name === data);
};



interface MatchFilter {
  filter: string;
}
interface RangeFilter {
  filter: number;
  filterTo: number;
}
type Instances = Movie | Category;

interface ValuesFilter {
  values: string;
}

type matchFilter = (array: Movie[] | Category[], value: MatchFilter) => Movie[] | Category[];
