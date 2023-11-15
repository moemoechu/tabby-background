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
  backgroundDropShadowEnabled: boolean;
  backgroundDropShadowX: number;
  backgroundDropShadowY: number;
  backgroundDropShadowBlur: number;
  backgroundDropShadowColor: string;
  backgroundOpacity: number;
  backgroundBlur: number;
  backgroundBrightness: number;
  backgroundContrast: number;
  backgroundGrayscale: number;
  backgroundHueRotate: number;
  backgroundInvert: number;
  backgroundSaturate: number;
  backgroundSepia: number;
  backgroundListGroupTransparent: number;
  backgroundTerminalToolbarTransparent: number;
  backgroundFooterTransparent: number;
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
      backgroundDropShadowEnabled: false,
      backgroundDropShadowX: 0,
      backgroundDropShadowY: 0,
      backgroundDropShadowBlur: 10,
      backgroundDropShadowColor: "gray",
      backgroundOpacity: 45,
      backgroundBlur: 0,
      backgroundBrightness: 100,
      backgroundContrast: 100,
      backgroundGrayscale: 0,
      backgroundHueRotate: 0,
      backgroundInvert: 0,
      backgroundSaturate: 100,
      backgroundSepia: 0,
      backgroundListGroupTransparent: 0,
      backgroundTerminalToolbarTransparent: 0,
      backgroundFooterTransparent: 50,
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
