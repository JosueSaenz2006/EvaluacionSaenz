import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

export interface Show 
{
  id: number;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  premiered: string;
  rating: {
    average: number | null;
  };
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
}

export interface ApiResponse 
{
  score: number;
  show: Show;
}

export interface WatchlistItem 
{
  serie_id: number;
  titulo_formateado: string;
  es_top: boolean;
}

/*
interface PaginatedResponse<T> 
{
  count: number;
  next: string | null;
  prev: string | null;
  pages: number;
  results: T[];
}
*/

@Injectable({
  providedIn: 'root'
})

export class TvmazeApiService 
{
    private readonly baseUrl = 'https://api.tvmaze.com/search/shows';
    private readonly watchlistKey = 'mi_watchlist';

    constructor(private http: HttpClient) {}

   /* getShows(): Observable<Show[]> 
    {
        return this.http
        .get<PaginatedResponse<Show>>(`${this.baseUrl}/shows`)
        .pipe(map(response => response.results));
    }*/

    buscarShows(letra: string): Observable<ApiResponse[]> 
    {
        return this.http.get<ApiResponse[]>(`${this.baseUrl}?q=${letra}`);
    }

    obtenerWatchlist(): WatchlistItem[] 
    {
        const data = localStorage.getItem(this.watchlistKey);
        console.log('Watchlist cargado:', data);
        return data ? JSON.parse(data) : [];
    }

    agregarAWatchlist(show: Show): void 
    {
        const watchlist = this.obtenerWatchlist();
        const year = show.premiered ? show.premiered.substring(0, 4) : 'N/A';
        const esTop = show.rating.average !== null && show.rating.average >= 8;

        const nuevoItem: WatchlistItem = {
            serie_id: show.id,
            titulo_formateado: `${show.name.toUpperCase()} (${year})`,
            es_top: esTop
        };

        watchlist.push(nuevoItem);
        localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
        console.log('Watchlist actualizado:', watchlist);
    }

    quitarDeWatchlist(showId: number): void 
    {
        let watchlist = this.obtenerWatchlist();
        watchlist = watchlist.filter(item => item.serie_id !== showId);
        localStorage.setItem(this.watchlistKey, JSON.stringify(watchlist));
    }

    estaEnWatchlist(showId: number): boolean 
    {
        const watchlist = this.obtenerWatchlist();
        return watchlist.some(item => item.serie_id === showId);
    }
}