// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { environment } from './app/environments/environment'; 
import { routes } from './app/app.routes';  

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),

    provideAuth(() => getAuth()),
  ],
}).catch(err => console.error(err));
