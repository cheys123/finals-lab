import { Routes } from '@angular/router';
import { TemplateDemo } from './template-demo/template-demo'; // Removed .ts
import { ReactiveDemo } from './reactive-demo/reactive-demo'; // Removed .ts

export const routes: Routes = [
  { path: 'template-demo', component: TemplateDemo },
  { path: 'reactive-demo', component: ReactiveDemo },
  { path: '', redirectTo: '/template-demo', pathMatch: 'full' }
];
