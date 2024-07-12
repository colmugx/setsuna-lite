import type { SpeakConfig } from "qwik-speak";

export const config: SpeakConfig = {
  defaultLocale: {
    lang: "zh-Hans",
    currency: "CHN",
    timeZone: "China/Shanghai",
  },
  supportedLocales: [
    { lang: "en-US", currency: "USD", timeZone: "America/Los_Angeles" },
    { lang: "zh-Hans", currency: "CHN", timeZone: "China/Shanghai" },
  ],
  // Translations available in the whole app
  assets: ["app"],
  // Translations with dynamic keys available in the whole app
  runtimeAssets: ["runtime"],
};
