export interface ticket {
  title: string;
  ticketType: any;
  priority: any;
  description: string;
}

export enum TicketType {
  Story,
  Task,
  Bug
}

export enum Priority {
  standard,
  high,
  very_high,
  blocker
}
