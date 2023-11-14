import { BackgroundPluginConfig, ShowType } from "configProvider";

export type FullscreenParams = Pick<
  BackgroundPluginConfig,
  "backgroundFullscreenType" | "backgroundFullscreenRepeatType"
>;

export type FloatParams = Pick<
  BackgroundPluginConfig,
  | "backgroundFloatSize"
  | "backgroundFloatX"
  | "backgroundFloatY"
  | "backgroundFloatXAlign"
  | "backgroundFloatYAlign"
>;

export type FilterParams = Pick<
  BackgroundPluginConfig,
  | "backgroundDropShadowEnabled"
  | "backgroundDropShadowX"
  | "backgroundDropShadowY"
  | "backgroundDropShadowBlur"
  | "backgroundDropShadowColor"
  | "backgroundOpacity"
  | "backgroundBlur"
  | "backgroundBrightness"
  | "backgroundContrast"
  | "backgroundGrayscale"
  | "backgroundHueRotate"
  | "backgroundInvert"
  | "backgroundSaturate"
  | "backgroundSepia"
>;

export function background(
  path: string,
  showType: ShowType,
  fullscreenParams: FullscreenParams,
  floatParams: FloatParams,
  filterParams: FilterParams
) {
  const { backgroundFullscreenType, backgroundFullscreenRepeatType } = fullscreenParams;
  const {
    backgroundFloatSize,
    backgroundFloatX,
    backgroundFloatY,
    backgroundFloatXAlign,
    backgroundFloatYAlign,
  } = floatParams;
  const {
    backgroundOpacity,
    backgroundBlur,
    backgroundBrightness,
    backgroundContrast,
    backgroundGrayscale,
    backgroundHueRotate,
    backgroundInvert,
    backgroundSaturate,
    backgroundSepia,
    backgroundDropShadowEnabled,
    backgroundDropShadowX,
    backgroundDropShadowY,
    backgroundDropShadowBlur,
    backgroundDropShadowColor,
  } = filterParams;

  const originalBgCss = `
.content-tab-active {
  background: none;
}

.content-tab-active::after {
  content: ""; position: fixed; left: 0; right: 0; z-index: -2; display: block; width: 100%; height: 100%;
  background: var(--body-bg);
}
start-page.content-tab-active::after {
  background: var(--theme-bg-more-2);
}\n`;

  const beforeBaseCss = `content: ""; position: fixed; left: 0; right: 0; z-index: -1; display: block; width: 100%; height: 100%;`;

  const filterCss =
    "filter:" +
    (backgroundOpacity === 100 ? "" : ` opacity(${backgroundOpacity}%)`) +
    (backgroundBlur === 0 ? "" : ` blur(${backgroundBlur}px)`) +
    (backgroundBrightness === 100 ? "" : ` brightness(${backgroundBrightness}%)`) +
    (backgroundContrast === 100 ? "" : ` contrast(${backgroundContrast}%)`) +
    (backgroundGrayscale === 0 ? "" : ` grayscale(${backgroundGrayscale}%)`) +
    (backgroundHueRotate === 0 ? "" : ` hue-rotate(${backgroundHueRotate}deg)`) +
    (backgroundInvert === 0 ? "" : ` invert(${backgroundInvert}%)`) +
    (backgroundSaturate === 100 ? "" : ` saturate(${backgroundSaturate}%)`) +
    (backgroundSepia === 0 ? "" : ` sepia(${backgroundSepia}%)`) +
    (showType === "float" && backgroundDropShadowEnabled
      ? ` drop-shadow(${backgroundDropShadowX}px ${backgroundDropShadowY}px ${backgroundDropShadowBlur}px ${backgroundDropShadowColor})`
      : "") +
    ";";

  // const filterCss2 = `filter:
  //   ${backgroundOpacity === 100 ? "" : `opacity(${backgroundOpacity}%)`}
  //   ${backgroundBlur === 0 ? "" : `blur(${backgroundBlur}px)`}
  //   ${backgroundBrightness === 100 ? "" : `brightness(${backgroundBrightness}%)`}
  //   ${backgroundContrast === 100 ? "" : `contrast(${backgroundContrast}%)`}
  //   ${backgroundGrayscale === 0 ? "" : `grayscale(${backgroundGrayscale}%)`}
  //   ${backgroundHueRotate === 0 ? "" : `hue-rotate(${backgroundHueRotate}deg)`}
  //   ${backgroundInvert === 0 ? "" : `invert(${backgroundInvert}%)`}
  //   ${backgroundSaturate === 100 ? "" : `saturate(${backgroundSaturate}%)`}
  //   ${backgroundSepia === 0 ? "" : `sepia(${backgroundSepia}%)`}
  //   ${
  //     showType === "float" && backgroundDropShadowEnabled
  //       ? `drop-shadow(${backgroundDropShadowX}px ${backgroundDropShadowY}px ${backgroundDropShadowBlur}px ${backgroundDropShadowColor})`
  //       : ""
  //   };`;

  const imagePathCss = `background-image: url("${path}");`;
  let css = originalBgCss;

  if (showType === "fullscreen") {
    css += `
.content-tab-active::before {
  ${beforeBaseCss}
  ${filterCss}

  ${imagePathCss}
  background-repeat: ${backgroundFullscreenRepeatType};
  background-position: center;
  background-size: ${backgroundFullscreenType};
}\n`;
  } else if (showType === "float") {
    css += `
.content-tab-active::before {
  ${beforeBaseCss}
  ${filterCss}

  ${imagePathCss}
  background-repeat: no-repeat;
  background-position: 
  ${
    backgroundFloatXAlign === "center"
      ? backgroundFloatXAlign
      : `${backgroundFloatXAlign} ${backgroundFloatX}px`
  } 
  ${
    backgroundFloatYAlign === "center"
      ? backgroundFloatYAlign
      : `${backgroundFloatYAlign} ${backgroundFloatY}px`
  }; 
  background-size: ${backgroundFloatSize}px;
}\n`;
  } else {
    throw new Error("ShowType Error!");
  }
  return css;
}

export function backgroundListGroupTransparent(transparent: number) {
  return `
.list-group {
  --bs-list-group-bg: color-mix(in srgb, var(--theme-bg-more) ${100 - transparent}%, transparent);
}\n`;
}

export function backgroundTerminalToolbarTransparent(transparent: number) {
  return `
terminal-toolbar {
  background: color-mix(in srgb, var(--bs-body-bg) ${100 - transparent}%, transparent) !important;
}\n`;
}

export function uiFont(family: string, size: number) {
  return `
body {
  font-family: "${family}";
  font-size: ${size}px;
}\n`;
}

export function uiCloseBtnFix() {
  return `
app-root>.content .tab-bar>.tabs tab-header button {
  /*left: 8px;*/
  font-family: "Source Sans Pro";
}\n`;
}

export function tabsFlexMinWidth(width: number) {
  return `
.flex-width {
  min-width: ${width}px;
}\n`;
}

export function tabsFixedWidth(width: number) {
  return `
tab-header {
  width: ${width}px !important;
}\n`;
}
