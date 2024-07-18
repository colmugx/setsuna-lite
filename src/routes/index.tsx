import { isBrowser } from "@builder.io/qwik/build";
import { LuRefreshCw } from "@qwikest/icons/lucide";
import {
  $,
  component$,
  Resource,
  useResource$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import Card from "~/components/card/card";
import { TaskService } from "~/services/task.service";
import { JiraEngine } from "~/engines/jira";
import { GitHubEngine } from "~/engines/github";

export default component$(() => {
  const fetchAtom = useSignal(0);

  const resource = useResource$(async ({ track }) => {
    const service = new TaskService([new JiraEngine(), new GitHubEngine()]);
    track(() => fetchAtom.value);

    if (isBrowser && fetchAtom.value) {
      const list = await service.list();

      return list.map((task) => task.toJSON());
    } else {
      return []
    }
  });

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (isBrowser) {
      fetchAtom.value++;
    }
  });

  const handleClick = $(() => {
    fetchAtom.value++;
  });

  return (
    <div>
      <div data-tauri-drag-region class="flex h-8 justify-end px-2 py-1">
        <button class="btn btn-xs" onClick$={handleClick}>
          <LuRefreshCw class={resource.loading ? "animate-spin" : ""} />
        </button>
      </div>
      <div class="grid grid-cols-12 grid-rows-1">
        {/* <div class="col-span-3 h-full">
          <MainMenu />
        </div> */}
        <div class="col-span-12 flex h-[688px] flex-col gap-4 overflow-auto p-4">
          <Resource
            value={resource}
            onResolved={(list) =>
              list.map((task) => <Card key={task.id} task={task} />)
            }
          />
        </div>
      </div>
    </div>
  );
});
