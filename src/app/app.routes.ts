// app.routes.ts
import { Route } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';  // Asegúrate de que esta ruta esté bien configurada
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RedComponent } from './components/red/red.component';
import { CreatePostComponent } from './components/create-post/create-post.component';

export const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reset-password', component: ResetPasswordComponent }, 
  { path: 'login', component: LoginComponent },  
  { path: 'register', component: RegisterComponent },
  {path: 'home', component: RedComponent},
  {path: 'create-post', component: CreatePostComponent},
  

];
