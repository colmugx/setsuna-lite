import type { TaskEntity } from "~/entities/task";

export abstract class Engine {
  abstract list(): Promise<TaskEntity[]>;
  abstract update(): void;
}
