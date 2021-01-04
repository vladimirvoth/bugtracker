import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { loadTickets } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectAllTickets, selectLoading } from '../../store/tickets.selectors';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  tickets$ = this.store.select(selectAllTickets);
  loading$ = this.store.select(selectLoading);

  constructor(private store: Store<fromTickets.State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTickets());
  }
}
