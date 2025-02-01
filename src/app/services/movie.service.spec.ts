// src/app/services/movie.service.spec.ts
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { MovieService } from './movie.service';

describe('MovieService', () => {
  let service: MovieService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MovieService],
    });
    service = TestBed.inject(MovieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movies', () => {
    const mockMovies = {
      results: [{ id: 1, title: 'Test Movie' }],
    };

    service.getMovies().subscribe((movies) => {
      expect(movies.results[0].title).toBe('Test Movie');
    });

    const req = httpMock.expectOne((request) =>
      request.url.includes('/movie/popular')
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMovies);
  });
});
