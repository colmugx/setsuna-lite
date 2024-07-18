import type { Engine } from "~/engines/engine";

export class TaskService {
  private engines: Engine[];

  constructor(engines: Engine[]) {
    this.engines = engines;
  }

  async list() {
    const data = await Promise.all(this.engines.map((engine) => engine.list()));
    return data
      .reduce((acc, curr) => acc.concat(curr), [])
      .sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());
  }
}
