import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { Ticket } from '../models/ticket';

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  constructor(private http: HttpClient) {}

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${environment.baseUrl}/tickets`, {
      ticket
    });
  }

  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.baseUrl}/tickets/${id}`);
  }

  updateTicket(
    id: string,
    value: string | number,
    property: string
  ): Observable<Ticket> {
    return this.http.patch<Ticket>(`${environment.baseUrl}/tickets/${id}`, {
      value,
      property
    });
  }
}
