import { getClient } from "@tauri-apps/api/http";
import type { Engine } from "./engine";
import { EOrigin, TaskEntity, TaskStatus } from "~/entities/task";
import type { TConfig } from "~/entities/config.type";

export class JiraEngine implements Engine {
  private host = '__JIRA_HOST__'
  private email = '__JIRA_EMAIL__'
  private token = '__JIRA_TOKEN__'

  private jiraApiUrl = ''
  private openPrefix = ''

  constructor(config: TConfig['jira']) {
    this.host = config.host;
    this.email = config.email;
    this.token = config.token;

    this.jiraApiUrl = `${this.host}/rest/api/3/search?jql=assignee=currentUser()`
    this.openPrefix = `${this.host}/browse/`;
  }

  async list() {
    const client = await getClient();

    const res = await client.get<{ issues: any[] }>(this.jiraApiUrl, {
      headers: {
        Authorization: `Basic ${btoa(`${this.email}:${this.token}`)}`,
        Accept: "application/json",
      },
    });

    return (res.data.issues || []).map(
      (task) =>
        new TaskEntity({
          id: task.id,
          title: task.key,
          description: task.fields.summary,
          status: TaskStatus.IN_PROGRESS,
          statusText: task.fields.status.name,
          origin: EOrigin.JIRA,
          createdAt: new Date(task.fields.created),
          createdBy: task.fields.creator.displayName,
          open: `${this.openPrefix}${task.key}`,
        }),
    );
  }

  update(): void {
    throw new Error("Method not implemented.");
  }
}
