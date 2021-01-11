import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { Component, OnInit } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';

import { priorities, statuses, types } from '../../models/ticket';
import { loadTickets } from '../../store/tickets.actions';
import * as fromTickets from '../../store/tickets.reducer';
import { selectAllTickets, selectLoading } from '../../store/tickets.selectors';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  types = types;
  priorities = priorities;
  statuses = statuses;
  faArrowDown = faArrowDown;
  allTickets = [];
  filteredPaginatedTickets = [];
  startItem = 0;
  endItem = 6;

  loading$ = this.store.select(selectLoading);

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
