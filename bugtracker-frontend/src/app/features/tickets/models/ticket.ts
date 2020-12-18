export interface Ticket {
  title: string;
  ticketType: Type;
  priority: Priority;
  description: string;
}

export enum Type {
  STORY = 'STORY',
  TASK = 'TASK',
  BUG = 'BUG'
}

export enum Priority {
  STANDARD = 'STANDARD',
  HIGH = 'HIGH',
  BLOCKER = 'BLOCKER'
}

export const types = [
  { key: Type.STORY, value: 'Story' },
  { key: Type.TASK, value: 'Task' },
  { key: Type.BUG, value: 'Bug' }
];

export const priorities = [
  { key: Priority.STANDARD, value: 'Standard' },
  { key: Priority.HIGH, value: 'High' },
  { key: Priority.BLOCKER, value: 'Blocker' }
];
