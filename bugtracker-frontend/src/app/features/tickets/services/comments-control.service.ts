import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Comment } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class CommentsControlService {
  constructor() {}

  toFormGroup(comments: Array<Comment>) {
    const group: any = {};

    comments.forEach((comment) => {
      group[comment._id] = new FormControl(
        comment.comment || '',
        Validators.required
      );
    });

    return new FormGroup(group);
  }
}
