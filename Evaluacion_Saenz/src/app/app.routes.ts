import { Routes } from '@angular/router';
import { TVMaze } from './componentes/tvmaze/tvmaze';


export const routes: Routes = 
[
     { path: '', redirectTo: 'inicio', pathMatch: 'full'},
     { path: 'inicio', component: TVMaze},
];
