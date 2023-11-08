import { ConfigProvider } from "tabby-core";

/** @hidden */
export class BackgroundConfigProvider extends ConfigProvider {
  defaults = {
    backgroundPlugin: {
      backgroundEnabled: false,
      backgroundPath: "../../../data/background.jpg",
      backgroundOpacity: 45,
      backgroundBlur: 0,
      backgroundBrightness: 100,
      backgroundContrast: 100,
      uiFontEnabled: false,
      uiFontFamily: "Source Sans Pro",
      uiFontSize: 14,
      uiFontTabBarCloseBtnFix: true,
      tabsOverrideEnabled: false,
      tabsFlexMinWidth: 200,
      tabsFixedWidth: 200,
    },
  };
}
