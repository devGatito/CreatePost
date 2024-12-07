import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, from } from 'rxjs';
import { Firestore, collection, getDocs, updateDoc, doc, DocumentData, arrayUnion, arrayRemove } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; 
import { RouterLink, RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-red',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive, RouterLinkWithHref],
  templateUrl: './red.component.html',
  styleUrls: ['./red.component.css']
})
export class RedComponent {
  posts$: Observable<any>;
  userComments: { [key: string]: string } = {};
  selectedPost: any = null;
  editingCommentIndex: number | null = null;

  constructor(private firestore: Firestore) {
    this.posts$ = this.getPosts();
  }

  getPosts(): Observable<any> {
    const postsCollection = collection(this.firestore, 'posts');
    return from(getDocs(postsCollection)).pipe(
      map(querySnapshot => {
        return querySnapshot.docs.map(doc => {
          const data = doc.data() as DocumentData;
          return {
            id: doc.id,
            name: data['name'],
            imageBase64: data['imageBase64'],
            createdAt: data['createdAt'],
            liked: data['liked'] || false, 
            comments: data['comments'] || [], 
          };
        });
      })
    );
  }

  async likePost(post: any): Promise<void> {
    const postRef = doc(this.firestore, `posts/${post.id}`);
    const newLikedState = !post.liked;
    await updateDoc(postRef, { liked: newLikedState });
    post.liked = newLikedState; 
  }

  async submitComment(post: any): Promise<void> {
    const postRef = doc(this.firestore, `posts/${post.id}`);
    const commentText = this.userComments[post.id];
    if (commentText && commentText.trim()) {
      await updateDoc(postRef, {
        comments: arrayUnion(commentText)
      });
      post.comments.push(commentText); 
      this.userComments[post.id] = ''; 
    }
  }

  openCommentsModal(post: any): void {
    this.selectedPost = post;
  }

  closeCommentsModal(): void {
    this.selectedPost = null; 
    this.editingCommentIndex = null; 
  }

  editComment(post: any, index: number): void {
    this.editingCommentIndex = index;
    this.userComments[post.id] = post.comments[index]; 
  }

  async deleteComment(post: any, index: number): Promise<void> {
    const postRef = doc(this.firestore, `posts/${post.id}`);
    const commentToDelete = post.comments[index];
    await updateDoc(postRef, {
      comments: arrayRemove(commentToDelete)
    });
    post.comments.splice(index, 1); 
    
  }
}
