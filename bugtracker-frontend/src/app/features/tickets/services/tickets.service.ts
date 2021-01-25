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
    return this.http.get<Array<Ticket>>(`${environment.apiUrl}/tickets`);
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(`${environment.apiUrl}/tickets`, {
      ticket
    });
  }

  getTicket(id: string): Observable<Ticket> {
    return this.http.get<Ticket>(`${environment.apiUrl}/tickets/${id}`);
  }

  updateTicket(
    id: string,
    value: string | number,
    property: string
  ): Observable<Ticket> {
    return this.http.patch<Ticket>(`${environment.apiUrl}/tickets/${id}`, {
      value,
      property
    });
  }

  createComment(id: string, comment: string): Observable<Ticket> {
    return this.http.post<Ticket>(
      `${environment.apiUrl}/tickets/${id}/comments`,
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
      `${environment.apiUrl}/tickets/${id}/comments/${commentId}`,
      {
        comment
      }
    );
  }

  removeComment(id: string, commentId: string): Observable<Ticket> {
    return this.http.delete<Ticket>(
      `${environment.apiUrl}/tickets/${id}/comments/${commentId}`
    );
  }
}
