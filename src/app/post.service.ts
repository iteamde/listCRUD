import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const postApi = 'https://jsonplaceholder.typicode.com/';

@Injectable()

export class PostService {

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get(postApi + 'posts', httpOptions);
  }

  savePost(post) {
    return this.http.put(postApi + `posts/${post.id}`, post, httpOptions);
  }

  deletePost(postId) {
    return this.http.delete(postApi + `posts/${postId}`, httpOptions);
  }

  createPost(newPost) {
    return this.http.post(postApi + 'posts', newPost, httpOptions);
  }
}

