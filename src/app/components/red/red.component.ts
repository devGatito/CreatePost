import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, from } from 'rxjs'; 
import { Firestore, collection, getDocs, DocumentData } from '@angular/fire/firestore'; 
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; 
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'app-red',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkWithHref, RouterLinkActive],  
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent {
  posts$: Observable<any>;

  constructor(private firestore: Firestore) {
    this.posts$ = this.getPosts(); 
  }

  getPosts(): Observable<any> {
    const postsCollection = collection(this.firestore, "posts");

    return from(getDocs(postsCollection)).pipe(
      map(querySnapshot => {
       
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as DocumentData;  
          return {
            imageBase64: data['imageBase64'],  
            createdAt: data['createdAt']
          };
        });
      })
    ); 
  }
}
