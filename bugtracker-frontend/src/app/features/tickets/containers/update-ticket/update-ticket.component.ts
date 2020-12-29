import { filter } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ticketForm } from '../../models/form';
import { priorities, types } from '../../models/ticket';
import { getTicket } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectCurrentTicket, selectLoading } from '../../store/tickets.selectors';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent implements OnInit {
  ticketForm = ticketForm;
  types = types;
  priorities = priorities;

  tickets$ = this.store.select(selectCurrentTicket);
  loading$ = this.store.select(selectLoading);

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromTickets.State>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.store.dispatch(getTicket({ id: params['id'] }));

      this.tickets$
        .pipe(filter((ticket) => Boolean(ticket)))
        .subscribe((ticket) => {
          this.ticketForm.patchValue({
            title: ticket.title,
            type: ticket.type,
            priority: ticket.priority,
            description: ticket.description
          });
        });
    });
  }

  saveCost(value) {
    console.log('saveCost', value);
  }
}
