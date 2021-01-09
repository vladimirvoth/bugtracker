import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faComment, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { Comment } from '../../models/ticket';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent {
  @Input() comment: Comment;
  @Input() control: FormControl;
  @Output() updateComment = new EventEmitter();
  @Output() removeComment = new EventEmitter();

  faComment = faComment;
  faTrashAlt = faTrashAlt;

  constructor() {}

  update(comment) {
    this.updateComment.emit({ comment, commentId: this.comment._id });
  }

  remove() {
    this.removeComment.emit({ commentId: this.comment._id });
  }
}
