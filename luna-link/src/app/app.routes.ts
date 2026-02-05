import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'spaces',
    loadComponent: () => import('./pages/spaces/spaces.page').then( m => m.SpacesPage)
  }, 
  {
    path: 'booking/:id',
    loadComponent: () => import('./pages/booking/booking.page').then( m => m.BookingPage)
  },
  
];