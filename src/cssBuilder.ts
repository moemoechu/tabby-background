import {
  FloatXAlign,
  FloatYAlign,
  FullscreenRepeatType,
  FullscreenType,
  ShowType,
} from "configProvider";

export function background(
  path: string,
  showType: ShowType,
  fullscreenType: FullscreenType,
  fullscreenRepeatType: FullscreenRepeatType,
  floatSize: number,
  floatX: number,
  floatY: number,
  floatXAlign: FloatXAlign,
  floatYAlign: FloatYAlign,
  opacity: number,
  blur: number,
  brightness: number,
  contrast: number
) {
  const originalBgCss = `
.content-tab-active {
  background: none;
}

.content-tab-active::after {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -2;
  display: block;
  width: 100%;
  height: 100%;

  background: var(--body-bg);
}
start-page.content-tab-active::after {
  background: var(--theme-bg-more-2);
}\n`;

  let css = originalBgCss;

  if (showType === "fullscreen") {
    css += `
.content-tab-active::before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;

  filter: opacity(${opacity}%)
  blur(${blur}px)
  brightness(${brightness}%)
  contrast(${contrast}%);

  background-image: url("${path}");
  background-repeat: ${fullscreenRepeatType};
  background-position: center;
  background-size: ${fullscreenType};
}\n`;
  } else if (showType === "float") {
    css += `
.content-tab-active::before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;
  display: block;
  width: 100%;
  height: 100%;

  filter: opacity(${opacity}%)
  blur(${blur}px)
  brightness(${brightness}%)
  contrast(${contrast}%);

  background-image: url("${path}");
  background-repeat: no-repeat;
  background-position: 
  ${floatXAlign === "center" ? floatXAlign : `${floatXAlign} ${floatX}px`} 
  ${floatYAlign === "center" ? floatYAlign : `${floatYAlign} ${floatY}px`}; 
  background-size: ${floatSize}px;
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
