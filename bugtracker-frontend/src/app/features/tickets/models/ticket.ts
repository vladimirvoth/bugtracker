export interface Ticket {
  _id: string;
  title: string;
  type: Type;
  priority: Priority;
  status: Status;
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

export enum Status {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  TESTING = 'TESTING',
  DONE = 'DONE'
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

export const statuses = [
  { key: Status.OPEN, value: 'Open' },
  { key: Status.IN_PROGRESS, value: 'In Progress' },
  { key: Status.TESTING, value: 'Testing' },
  { key: Status.DONE, value: 'Done' }
];
