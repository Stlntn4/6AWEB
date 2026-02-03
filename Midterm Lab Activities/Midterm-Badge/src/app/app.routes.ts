import { Routes } from '@angular/router';
import { Home } from './home/home';
import { About } from './about/about';
import { Services } from './services/services';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', loadComponent: () => Home },
  { path: 'about', loadComponent: () => About },
  { path: 'services', loadComponent: () => Services },
  { path: 'contact', loadComponent: () => Contact },

  { path: '**', redirectTo: 'home' }
];
