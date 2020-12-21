import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { getTicket } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectTickets } from '../../store/tickets.selectors';

@Component({
  selector: 'app-update-ticket',
  templateUrl: './update-ticket.component.html',
  styleUrls: ['./update-ticket.component.scss']
})
export class UpdateTicketComponent implements OnInit {
  id: string;

  tickets$ = this.store.select(selectTickets);

  // Weg damit
  name = 'Hello angular inline input';
  cost = 100;

  username = new FormControl('');

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromTickets.State>
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];

      this.store.dispatch(getTicket({ id: params['id'] }));

      this.tickets$.subscribe((tickets) => console.log('sub', tickets));
    });
  }

  saveCost(value) {
    console.log('saveCost', value);
    this.cost = value;
  }
}
