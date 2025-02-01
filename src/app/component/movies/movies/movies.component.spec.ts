// src/app/component/movies/movies.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MovieService } from '../../../services/movie.service';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let movieService: MovieService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesComponent, HttpClientTestingModule],
      providers: [
        MovieService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    const mockMovies = {
      results: [{ id: 1, title: 'Test Movie' }],
    };

    spyOn(movieService, 'getMovies').and.returnValue(of(mockMovies));

    fixture.detectChanges();

    expect(component.movies.length).toBe(1);
    expect(component.movies[0].title).toBe('Test Movie');
  });

  it('should load movies by genre when genre param is present', () => {
    const mockMovies = {
      results: [{ id: 1, title: 'Action Movie' }],
    };

    spyOn(movieService, 'getMoviesByGenre').and.returnValue(of(mockMovies));

    component.currentGenre = 28;
    component.loadMovies();

    expect(movieService.getMoviesByGenre).toHaveBeenCalledWith(28, 1);
  });
});
