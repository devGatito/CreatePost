import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { Observable, from } from 'rxjs'; // Importa 'from' para convertir la promesa en Observable
import { Firestore, collection, getDocs, DocumentData } from '@angular/fire/firestore'; // Añade DocumentData para tipado adecuado
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-red',
  standalone: true,
  imports: [CommonModule],  // Asegúrate de incluir CommonModule aquí
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent {
  posts$: Observable<any>;

  constructor(private firestore: Firestore) {
    this.posts$ = this.getPosts(); // Obtiene los posts directamente como un Observable
  }

  getPosts(): Observable<any> {
    const postsCollection = collection(this.firestore, "posts");

    // Convertir la promesa de getDocs en un Observable usando 'from'
    return from(getDocs(postsCollection)).pipe(
      map(querySnapshot => {
        // Mapeamos los datos y asumimos que cada post tiene una propiedad 'imageBase64'
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as DocumentData;  // Asegura que 'data' tiene el tipo adecuado
          return {
            imageBase64: data['imageBase64'],  // Accede de manera segura al campo 'imageBase64'
            createdAt: data['createdAt']
          };
        });
      })
    );
  }
}
