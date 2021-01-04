import { Component, Input, OnInit } from '@angular/core';

import { Ticket } from '../../models/ticket';

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit {
  @Input() ticket: Ticket;

  constructor() {}

  ngOnInit(): void {}
}
