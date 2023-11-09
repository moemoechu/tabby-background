import { ConfigProvider } from "tabby-core";

export type BackgroundPluginConfig = {
  backgroundEnabled: boolean;
  backgroundPath: string;
  backgroundOpacity: number;
  backgroundBlur: number;
  backgroundBrightness: number;
  backgroundContrast: number;
  backgroundListGroupTransparent: number;
  uiFontEnabled: boolean;
  uiFontFamily: string;
  uiFontSize: number;
  uiFontTabBarCloseBtnFix: boolean;
  tabsOverrideEnabled: boolean;
  tabsFlexMinWidth: number;
  tabsFixedWidth: number;
};

/** @hidden */
export class BackgroundConfigProvider extends ConfigProvider {
  defaults: { backgroundPlugin: BackgroundPluginConfig } = {
    backgroundPlugin: {
      backgroundEnabled: false,
      backgroundPath: "../../../data/background.jpg",
      backgroundOpacity: 45,
      backgroundBlur: 0,
      backgroundBrightness: 100,
      backgroundContrast: 100,
      backgroundListGroupTransparent: 0,
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
