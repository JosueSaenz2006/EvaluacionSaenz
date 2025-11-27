import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TvmazeApiService, ApiResponse, Show } from '../../services/tvmaze-api.service';

@Component({
  selector: 'app-tvmaze',
  imports: [CommonModule, FormsModule],
  templateUrl: './tvmaze.html',
  styleUrl: './tvmaze.css',
})

export class TVMaze implements OnInit
{
  private tvmazeService = inject(TvmazeApiService);
  
  letraBusqueda: string = '';
  shows: Show[] = [];
  cargando: boolean = false;

  /*personajes: any[] = [];*/

  constructor() {}

  ngOnInit(): void 
  {
    /*this.cargarDatosIniciales();*/
  }

 /* cargarDatosIniciales() 
  {
    this.tvmazeService.getShows().subscribe
    ({
      next: (data) => 
      {
        console.log('Personajes desde API:', data);
        this.personajes = data;
      },
      error: (err) => console.error('Error al cargar personajes:', err)
    });
  }
  */

  buscarProgramas(): void 
  {
    if (!this.letraBusqueda.trim()) 
    {
      return;
    }

    this.cargando = true;
    this.tvmazeService.buscarShows(this.letraBusqueda).subscribe
    ({
      next: (data: ApiResponse[]) => 
      {
        console.log('Resultados de búsqueda:', data);
        this.shows = data.map(item => item.show);
        this.cargando = false;
      },
      error: (err) => 
      {
        console.error('Error al buscar programas:', err);
        this.cargando = false;
      }
    });
  }

  obtenerClaseCard(rating: number | null): string 
  {
    if (rating !== null && rating >= 8.0) 
    {
      return 'card-top';
    }
    return 'card-normal';
  }

  obtenerRatingTexto(rating: number | null): string 
  {
    return rating !== null ? rating.toFixed(1) : 'Sin calificar';
  }

  toggleWatchlist(show: Show): void 
  {
    if (this.tvmazeService.estaEnWatchlist(show.id)) 
    {
      this.tvmazeService.quitarDeWatchlist(show.id);
    } 
    else 
    {
      this.tvmazeService.agregarAWatchlist(show);
    }
  }

  estaEnWatchlist(showId: number): boolean 
  {
    return this.tvmazeService.estaEnWatchlist(showId);
  }

  obtenerTextoBoton(showId: number): string 
  {
    return this.estaEnWatchlist(showId) ? 'Dejar de seguir' : 'Seguir';
  }
}


