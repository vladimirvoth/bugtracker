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

  loadTickets(): Observable<Array<Ticket>> {
    return this.http.get<Array<Ticket>>(`${environment.baseUrl}/tickets`);
  }

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

  createComment(id: string, comment: string): Observable<Ticket> {
    return this.http.post<Ticket>(
      `${environment.baseUrl}/tickets/${id}/comments`,
      {
        comment
      }
    );
  }

  updateComment(
    id: string,
    commentId: string,
    comment: string
  ): Observable<Ticket> {
    return this.http.patch<Ticket>(
      `${environment.baseUrl}/tickets/${id}/comments/${commentId}`,
      {
        comment
      }
    );
  }

  removeComment(id: string, commentId: string): Observable<Ticket> {
    return this.http.delete<Ticket>(
      `${environment.baseUrl}/tickets/${id}/comments/${commentId}`
    );
  }
}
