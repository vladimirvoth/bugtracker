import { filter } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';

import { editorConfig } from '../../../../../assets/config/config.angular-editor';
import { commentForm } from '../../models/forms';
import { Comment } from '../../models/ticket';
import { CommentsControlService } from '../../services/comments-control.service';
import { createComment, removeComment, updateComment } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectCurrentTicket, selectLoading } from '../../store/tickets.selectors';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  id: string;
  comments: Array<Comment>;
  commentsForm: FormGroup;
  ticketForm = commentForm;
  editorConfig = { ...editorConfig, placeholder: 'Enter comment here...' };

  ticket$ = this.store.select(selectCurrentTicket);
  loading$ = this.store.select(selectLoading);

  constructor(
    private store: Store<fromTickets.State>,
    private commentsControlService: CommentsControlService
  ) {}

  ngOnInit() {
    this.ticket$
      .pipe(filter((ticket) => Boolean(ticket)))
      .subscribe((ticket) => {
        this.id = ticket._id;
        this.comments = ticket.comments;
        this.commentsForm = this.commentsControlService.toFormGroup(
          this.comments
        );
      });
  }

  createComment() {
    this.store.dispatch(
      createComment({
        id: this.id,
        comment: this.ticketForm.get('comment').value
      })
    );

    this.ticketForm.reset();
  }

  updateComment(comment, commentId) {
    this.store.dispatch(
      updateComment({
        id: this.id,
        commentId,
        comment
      })
    );
  }

  removeComment(commentId) {
    this.store.dispatch(
      removeComment({
        id: this.id,
        commentId
      })
    );
  }
}
