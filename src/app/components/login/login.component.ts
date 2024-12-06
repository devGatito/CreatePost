import { Component } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
 
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private auth: Auth, private router: Router) {} 

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('Usuario logueado exitosamente:', userCredential.user);
        
        // Obtener el token y almacenarlo
        userCredential.user.getIdToken().then((token) => {
          localStorage.setItem('authToken', token);
          console.log('Token guardado:', token);
          
          // Navegar a la página de inicio
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error.message);
        alert("El usuario no existe");
      });
  }
  
  loginWithGoogle() {
    const googleProvider = new GoogleAuthProvider();
    signInWithPopup(this.auth, googleProvider)
      .then((userCredential) => {
        console.log('Usuario logueado con Google:', userCredential.user);
  
        userCredential.user.getIdToken().then((token) => {
          localStorage.setItem('authToken', token);
          console.log('Token guardado:', token);
  
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Google:', error.message);
      });
  }
  
  loginWithFacebook() {
    const facebookProvider = new FacebookAuthProvider();
    signInWithPopup(this.auth, facebookProvider)
      .then((userCredential) => {
        console.log('Usuario logueado con Facebook:', userCredential.user);
  
        userCredential.user.getIdToken().then((token) => {
          localStorage.setItem('authToken', token);
          console.log('Token guardado:', token);
  
          this.router.navigate(['/home']);
        });
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Facebook:', error.message);
      });
  }
}  
