import { Component, ElementRef, ViewChild } from '@angular/core';
import { PostService } from './post.service';
import { Post } from './post';

import uniqBy from 'lodash/uniqBy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public posts: Post[];
  public limitPost = 3;
  public filterByUserId = 0;
  public showAddPost = false;
  public usersIdArray = [];
  public newPost: Post = {
    userId: null,
    title: '',
    body: ''
  };

  @ViewChild('postContainer') postContainer: ElementRef;

  constructor (private postService: PostService) {
    this.getPosts();
  }

  checkIfScrolledToBottom() {
    const el = this.postContainer.nativeElement;
    if (el.scrollHeight - el.scrollTop === el.clientHeight) {
     this.limitPost++;
    }
  }

  getPosts() {
    return this.postService.getPosts().subscribe((res: Post[]) => {
      this.posts = res;
      const arr = uniqBy(this.posts, 'userId').map( (obj: Post) => obj.userId);
      this.usersIdArray = [0].concat(arr);
    });
  }

  savePost(post) {
    delete post.showEditField;
    return this.postService.savePost(post).subscribe((res: Post) => console.log(res));
  }

  deletePost(postId) {
    this.posts = this.posts.filter((post: Post) => post.id !== postId);
    return this.postService.deletePost(postId).subscribe((res: any) => console.log(res));
  }

  addPost() {
    if ( !this.newPost.title || !this.newPost.body ) return;

    this.newPost.userId = 1; // just for test
    return this.postService.createPost(this.newPost).subscribe((res: Post) => {
      this.posts = [res].concat(this.posts);
      this.showAddPost = false;
    });
  }

  trackByFn(index) {
    return index;
  }
}
