import { BackgroundPluginConfig } from "configProvider";

export function background(configs: BackgroundPluginConfig) {
  const { backgroundEnabled, backgroundPath, backgroundShowType } = configs;
  const { backgroundFullscreenType, backgroundFullscreenRepeatType } = configs;
  const {
    backgroundFloatSize,
    backgroundFloatX,
    backgroundFloatY,
    backgroundFloatXAlign,
    backgroundFloatYAlign,
  } = configs;
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
  } = configs;

  let css = `/* added by tabby-background plugin */\n`;

  if (backgroundEnabled) {
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

    css += originalBgCss;
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
      (backgroundShowType === "float" && backgroundDropShadowEnabled
        ? ` drop-shadow(${backgroundDropShadowX}px ${backgroundDropShadowY}px ${backgroundDropShadowBlur}px ${backgroundDropShadowColor})`
        : "") +
      ";";

    const imagePathCss = `background-image: url("${backgroundPath.replaceAll("\\", "/")}");`;

    if (backgroundShowType === "fullscreen") {
      css += `
.content-tab-active::before {
  ${beforeBaseCss}
  ${filterCss}

  ${imagePathCss}
  background-repeat: ${backgroundFullscreenRepeatType};
  background-position: center;
  background-size: ${backgroundFullscreenType};
}\n`;
    } else if (backgroundShowType === "float") {
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

    const {
      backgroundListGroupTransparent,
      backgroundTerminalToolbarTransparent,
      backgroundFooterTransparent,
    } = configs;
    let extraCss = "";
    if (backgroundListGroupTransparent > 0) {
      extraCss += `
.list-group {
  --bs-list-group-bg: color-mix(in srgb, var(--theme-bg-more) ${
    100 - backgroundListGroupTransparent
  }%, transparent);
}\n`;
    }
    if (backgroundTerminalToolbarTransparent > 0) {
      extraCss += `
terminal-toolbar {
  background: color-mix(in srgb, var(--bs-body-bg) ${
    100 - backgroundTerminalToolbarTransparent
  }%, transparent) !important;
}\n`;
    }
    if (backgroundFooterTransparent !== 50) {
      extraCss += `
footer {
  background: color-mix(in srgb, rgba(0,0,0,1) ${
    100 - backgroundFooterTransparent
  }%, transparent) !important;
}\n`;
    }
    css += extraCss;
  }
  const { uiFontEnabled, uiFontFamily, uiFontSize, uiFontTabBarCloseBtnFix } = configs;
  let uiFontCss = "";

  if (uiFontEnabled) {
    uiFontCss += uiFont(uiFontFamily, uiFontSize);
    if (uiFontTabBarCloseBtnFix) {
      uiFontCss += uiCloseBtnFix();
    }
  }
  css += uiFontCss;
  // if (tabsOverrideEnabled) {
  //   css += tabsFlexMinWidth(tabsFlexMinWidth);
  //   css += tabsFixedWidth(tabsFixedWidth);
  // }

  const { othersInactiveTabDimming, othersActiveTabDimming } = configs;
  let othersCss = "";

  if (othersInactiveTabDimming !== 50) {
    othersCss += `
split-tab>.child {
  opacity: ${(100 - othersInactiveTabDimming) / 100};
}`;
  }

  if (othersActiveTabDimming !== 0) {
    othersCss += `
split-tab>.child.focused {
  opacity: ${(100 - othersActiveTabDimming) / 100};
}`;
  }

  css += othersCss;

  return css;
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
