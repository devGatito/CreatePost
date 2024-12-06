import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CreatePostComponent {
  selectedFile: File | null = null;
  imageBase64: string | null = null; // Para almacenar la cadena base64 de la imagen
  private firestore = inject(Firestore);  // Inyección de Firestore

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      console.log('Archivo seleccionado:', this.selectedFile.name);
    }
  }

  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string); // Resolvemos con la cadena base64
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file); // Convertir archivo a base64
    });
  }

  async uploadFile(): Promise<void> {
    if (!this.selectedFile) {
      alert('Por favor, selecciona un archivo primero.');
      return;
    }

    try {
      // Convertir la imagen a base64
      this.imageBase64 = await this.convertFileToBase64(this.selectedFile);
      console.log('Imagen convertida a Base64:', this.imageBase64);

      // Guardar la imagen base64 en Firestore
      if (this.imageBase64) {
        const postCollection = collection(this.firestore, 'posts');
        await addDoc(postCollection, {
          imageBase64: this.imageBase64,
          createdAt: new Date()
        });
        alert('Imagen guardada como Base64 en Firestore');
      }
    } catch (error) {
      console.error('Error al convertir la imagen:', error);
      alert('Error al convertir la imagen.');
    }
  }
}
