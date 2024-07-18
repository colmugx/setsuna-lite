import { $, component$ } from "@builder.io/qwik";
import type { TaskEntity } from "~/entities/task";
import { EOrigin } from "~/entities/task";
import { TaskStatus } from "~/entities/task";
import { SiGithub, SiJira } from "@qwikest/icons/simpleicons";
import { LuPen } from "@qwikest/icons/lucide";
import { open } from "@tauri-apps/api/shell";

interface CardProps {
  task: ReturnType<TaskEntity["toJSON"]>;
}

const OriginSign$ = ({ type }: { type: EOrigin }) => {
  switch (type) {
    case EOrigin.JIRA:
      return <SiJira color="#0052CC" />;
    case EOrigin.GITHUB:
      return <SiGithub color="#181717" />;
  }
};

const colorMap = {
  [TaskStatus.OPEN]: "badge-info",
  [TaskStatus.IN_PROGRESS]: "badge-warning",
  [TaskStatus.DONE]: "badge-success",
};

export default component$((props: CardProps) => {
  const { task } = props;

  const handleClick = $(() => {
    console.log(task.open);
    if (task.open) {
      open(task.open);
    }
  });

  return (
    <div
      class={`card glass cursor-pointer rounded-lg border-2 border-dotted border-zinc-300 shadow-lg ${task.status === TaskStatus.DONE ? "opacity-50" : ""}`}
      onClick$={handleClick}
    >
      <div class="card-body gap-1 p-3">
        <h2
          class={`card-title text-base ${task.status === TaskStatus.DONE ? "line-through" : ""}`}
        >
          {task.title}
        </h2>
        <p class="text-sm">{task.description}</p>
        <div class="card-actions mt-2 flex-col text-sm">
          <div class="flex items-center gap-1">
            <OriginSign$ type={task.origin} />
            {task.createdBy && (
              <div
                class={`badge badge-neutral badge-sm line-clamp-1 flex items-center gap-1 rounded-md`}
              >
                <LuPen />
                <span>{task.createdBy}</span>
              </div>
            )}
          </div>
          <div class="flex w-full justify-between">
            <div class={`badge badge-sm rounded-md ${colorMap[task.status]}`}>
              {task.statusText}
            </div>
            <div class="text-xs text-neutral">
              {task.createdAt.toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
