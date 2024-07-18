import { EOrigin, TaskEntity, TaskStatus } from "~/entities/task";
import type { Engine } from "./engine";

export class MockEngine implements Engine {
  async list() {
    const tasks: TaskEntity[] = [
      new TaskEntity({
        id: 1,
        title: "Implement login feature",
        description:
          "Add functionality to allow users to log in to the application",
        status: TaskStatus.OPEN,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 2,
        title: "Refactor API calls",
        description:
          "Optimize and improve the existing API calls for better performance",
        status: TaskStatus.IN_PROGRESS,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 3,
        title: "Fix bug in user registration",
        description:
          "Investigate and resolve the issue causing errors during user registration",
        status: TaskStatus.OPEN,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 4,
        title: "Write unit tests",
        description:
          "Create comprehensive unit tests to ensure code quality and reliability",
        status: TaskStatus.DONE,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 5,
        title: "Design homepage layout",
        description:
          "Collaborate with UI/UX team to design an appealing and user-friendly homepage layout",
        status: TaskStatus.IN_PROGRESS,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 6,
        title: "Implement data validation",
        description:
          "Add validation logic to ensure data integrity and prevent invalid inputs",
        status: TaskStatus.OPEN,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 7,
        title: "Optimize database queries",
        description:
          "Analyze and optimize database queries to improve overall system performance",
        status: TaskStatus.IN_PROGRESS,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
      new TaskEntity({
        id: 8,
        title: "Deploy application to production",
        description:
          "Prepare and deploy the application to the production environment for public use",
        status: TaskStatus.DONE,
        origin: EOrigin.GITHUB,
        statusText: "Open",
        createdAt: new Date(),
      }),
    ];

    return tasks;
  }

  update() {
    console.log("Update");
  }
}
