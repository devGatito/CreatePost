import { Component } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: Auth) {}

  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(userCredential => {
        console.log('User registered successfully:', userCredential.user);
      })
      .catch(error => {
        console.error('Error registering user:', error.message);
      });
  }
}
