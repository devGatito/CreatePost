import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router'; 
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink, RouterLinkWithHref, RouterLinkActive],
})
export class CreatePostComponent {
  selectedFile: File | null = null;
  imageBase64: string | null = null;
  postName: string = '';
  private firestore = inject(Firestore);

  constructor() {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  async convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }

  async uploadFile(): Promise<void> {
    if (!this.selectedFile || !this.postName) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      this.imageBase64 = await this.convertFileToBase64(this.selectedFile);
      if (this.imageBase64) {
        const postCollection = collection(this.firestore, 'posts');
        await addDoc(postCollection, {
          name: this.postName,
          imageBase64: this.imageBase64,
          createdAt: new Date(),
        });
        alert('Publicación creada exitosamente.');
        this.resetForm();
      }
    } catch (error) {
      alert('Error al crear la publicación.');
    }
  }

  resetForm(): void {
    this.postName = '';
    this.selectedFile = null;
    this.imageBase64 = null;
  }
}
