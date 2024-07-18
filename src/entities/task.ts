export const enum EOrigin {
  GITHUB,
  JIRA,
}

export const enum TaskStatus {
  OPEN,
  IN_PROGRESS,
  DONE,
}

interface ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  statusText: string;
  origin: EOrigin;
  createdBy?: string;
  createdAt: Date;
  open?: string;
}

export class TaskEntity implements ITask {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  statusText: string;
  origin: EOrigin;
  createdAt: Date;
  createdBy?: string;
  open?: string;

  constructor({
    id,
    title,
    description,
    status,
    statusText,
    origin,
    createdAt,
    createdBy,
    open,
  }: ITask) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.statusText = statusText;
    this.origin = origin;
    this.createdAt = createdAt;
    this.createdBy = createdBy;
    this.open = open;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      statusText: this.statusText,
      origin: this.origin,
      createdAt: this.createdAt,
      createdBy: this.createdBy,
      open: this.open,
    };
  }
}
