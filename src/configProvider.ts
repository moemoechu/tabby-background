import { ConfigProvider } from "tabby-core";

/** @hidden */
export class BackgroundConfigProvider extends ConfigProvider {
  defaults = {
    backgroundPlugin: {
      backgroundEnabled: false,
      backgroundPath: "",
      backgroundOpacity: 45,
      backgroundBlur: 0,
      backgroundBrightness: 100,
      backgroundContrast: 100,
    },
  };
}
