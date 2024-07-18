import { getClient } from "@tauri-apps/api/http";
import type { Engine } from "./engine";
import { EOrigin, TaskEntity, TaskStatus } from "~/entities/task";
import type { TConfig } from "~/entities/config.type";

export class GitHubEngine implements Engine {
  private readonly apiUrl = "https://api.github.com/notifications";
  private token = "__GITHUB_TOKEN__";

  constructor(config: TConfig["github"]) {
    this.token = config.token;
  }

  async list() {
    const client = await getClient();

    const res = await client.get<any[] | undefined>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        Accept: 'application/vnd.github+json',
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "Awesome-Octocat-App",
      },
    });

    return (res.data || []).map(
      (task) =>
        new TaskEntity({
          id: task.id,
          title: task.subject.title,
          description: task.reason,
          status: TaskStatus.OPEN,
          statusText: task.subject.type,
          origin: EOrigin.GITHUB,
          createdAt: new Date(task.updated_at),
          createdBy: task.repository.full_name,
          open: task.subject.url.replace(
            /https:\/\/api.github.com\/repos\/(.*)\/pulls\/(.*)/,
            "https://github.com/$1/pull/$2",
          ),
        }),
    );
  }

  update(): void {
    throw new Error("Method not implemented.");
  }
}
