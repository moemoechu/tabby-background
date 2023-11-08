export function background(path: string, opacity: number, blur: number, brightness: number, contrast: number) {
  return `
.content-tab-active {
  background: none;
}
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
  background-position: center;
  background-size: cover;
}\n`;
}

export function backgroundListGroupTransparent(transparent: number) {
  return `
.list-group {
  --bs-list-group-bg: color-mix(in srgb, var(--theme-bg-more) ${100 - transparent}%, transparent);
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
