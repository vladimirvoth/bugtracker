import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {
  @Input() commentId: string;
  @Input() control: FormControl;
  @Output() updateComment = new EventEmitter();
  @Output() removeComment = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  update(comment) {
    this.updateComment.emit({ comment, commentId: this.commentId });
  }

  remove() {
    this.removeComment.emit({ commentId: this.commentId });
  }
}
