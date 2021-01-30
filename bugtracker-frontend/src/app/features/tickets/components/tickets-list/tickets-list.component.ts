import { PageChangedEvent } from 'ngx-bootstrap/pagination';

import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';

import { priorities, statuses, Ticket, types } from '../../models/ticket';

@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {
  @Input() tickets: Array<Ticket>;

  types = types;
  priorities = priorities;
  statuses = statuses;
  faArrowDown = faArrowDown;
  allTickets = [];
  filteredPaginatedTickets = [];
  startItem = 0;
  endItem = 6;

  constructor() {}

  ngOnInit() {
    this.allTickets = this.tickets;

    this.sliceTickets();
  }

  pageChanged(event: PageChangedEvent) {
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
