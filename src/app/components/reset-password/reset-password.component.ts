// reset-password.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';  
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  standalone: true,  
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  imports: [CommonModule, FormsModule]  
})
export class ResetPasswordComponent {
  email: string = '';

  constructor(private router: Router) {}

  async onSubmit() {
    const auth = getAuth(); 
    try {
      await sendPasswordResetEmail(auth, this.email); 
      alert('Se ha enviado un correo para restablecer tu contraseña');
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert('Error al enviar el correo: ' + error.message);
    }
  }
}
