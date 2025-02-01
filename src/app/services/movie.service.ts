import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovieResponse } from '../model/movie.interface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '7c98f4ea1bff8262bb7079a2dccd4456';
  private apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  getMovies(page: number = 1): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/movie/popular?api_key=${this.apiKey}&page=${page}`
    );
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

  getUpcomingMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&page=${page}`
    );
  }

  getTopRatedMovies(page: number = 1): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(
      `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&page=${page}`
    );
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: query,
        language: 'fr-FR',
      },
    });
  }
}
