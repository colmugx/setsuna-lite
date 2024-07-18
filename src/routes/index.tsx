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
import { dialog, fs, invoke } from "@tauri-apps/api";
import type { TConfig } from "~/entities/config.type";
import { nonEmpty, object, parse, pipe, string, ValiError } from 'valibot'

const configSchema = object({
  jira: object({
    host: pipe(string(), nonEmpty()),
    email: pipe(string(), nonEmpty()),
    token: pipe(string(), nonEmpty()),
  }),
  github: object({
    token: pipe(string(), nonEmpty()),
  }),
})

export default component$(() => {
  const config = useSignal<TConfig>();
  const fetchAtom = useSignal(0);

  const resource = useResource$(async ({ track }) => {
    track(() => fetchAtom.value);

    if (isBrowser && fetchAtom.value) {
      const service = new TaskService([new JiraEngine(config.value!.jira), new GitHubEngine(config.value!.github)]);
      const list = await service.list();

      // 修改 badge
      invoke('set_badge', { count: list.length });

      return list.map((task) => task.toJSON());
    } else {
      return []
    }
  });

  const handleFetch = $(() => {
    fetchAtom.value++;
  })

  const readConfig = $(async () => {
    if (isBrowser) {
      if (!config.value) {
        const file = await dialog.open({
          filters: [{ name: 'JSON', extensions: ['json'] }],
          multiple: false,
          directory: false,
          defaultPath: '.',
          title: '选择配置文件'
        });

        if (file) {
          try {
            const content = await fs.readTextFile(file as string)
            const data = parse(configSchema, JSON.parse(content))
            console.log(data)
            config.value = data;

            handleFetch();
          } catch (error) {
            if (error instanceof ValiError) {
              dialog.message("Error", error.message);
            }
          }
        } else {
          dialog.message("Error", "No file selected");
        }
      }
    }
  })

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(() => {
    if (isBrowser) {
      readConfig()
    }
  });

  const handleClick = $(() => {
    // eslint-disable-next-line qwik/valid-lexical-scope
    if (!config.value) {
      readConfig();
      return;
    }

    handleFetch();
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
