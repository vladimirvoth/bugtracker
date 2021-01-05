import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

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
  loading$ = this.store.select(selectLoading);

  allTickets = [];
  filteredPaginatedTickets = [];

  startItem = 0;
  endItem = 5;

  constructor(private store: Store<fromTickets.State>) {}

  ngOnInit(): void {
    this.store.dispatch(loadTickets());

    this.store.select(selectAllTickets).subscribe((tickets) => {
      this.allTickets = tickets;

      this.sliceTickets();
    });
  }

  pageChanged(event: PageChangedEvent): void {
    this.startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;

    this.sliceTickets();
  }

  sliceTickets() {
    this.filteredPaginatedTickets = this.allTickets.slice(
      this.startItem,
      this.endItem
    );
  }

  sortBy(property) {
    this.allTickets = this.allTickets.sort((a, b) => {
      return a[property] > b[property] ? 1 : -1;
    });

    this.sliceTickets();
  }
}
