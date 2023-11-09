import { ConfigProvider } from "tabby-core";

export type ShowType = "fullscreen" | "float";
export type FullscreenType = "contain" | "cover";
export type FullscreenRepeatType = "repeat" | "no-repeat";

export type FloatXAlign = "left" | "center" | "right";
export type FloatYAlign = "top" | "center" | "bottom";

export type BackgroundPluginConfig = {
  backgroundEnabled: boolean;
  backgroundPath: string;
  backgroundShowType: ShowType;
  backgroundFullscreenType: FullscreenType;
  backgroundFullscreenRepeatType: FullscreenRepeatType;
  backgroundFloatSize: number;
  backgroundFloatX: number;
  backgroundFloatY: number;
  backgroundFloatXAlign: FloatXAlign;
  backgroundFloatYAlign: FloatYAlign;
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
      backgroundShowType: "fullscreen",
      backgroundFullscreenType: "cover",
      backgroundFullscreenRepeatType: "no-repeat",
      backgroundFloatSize: 300,
      backgroundFloatX: 0,
      backgroundFloatY: 0,
      backgroundFloatXAlign: "right",
      backgroundFloatYAlign: "bottom",
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
