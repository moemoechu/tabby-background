import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger } from "tabby-core";

const divider = "/* added by tabby-background plugin */";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  private styleElement: HTMLStyleElement;
  private backgroundCss: string = "";
  constructor(public config: ConfigService, private logService: LogService) {
    this.logger = this.logService.create("tabby-background");
    this.logger.info("BackgroundService ctor.");
    // console.log(document.querySelector("style#custom-css")!.innerHTML);
    this.styleElement = document.createElement("style");
    this.styleElement.id = "tabby-background";
    this.styleElement.innerHTML = "";
    document.body.appendChild(this.styleElement);
  }

  buildCss() {
    const { backgroundEnabled, backgroundOpacity, backgroundBlur, backgroundBrightness, backgroundContrast } = this.config.store.backgroundPlugin;
    const { uiFontEnable, uiFontFamily, uiFontSize, uiFontTabBarCloseBtnFix } = this.config.store.backgroundPlugin;
    const backgroundPath = (this.config.store.backgroundPlugin.backgroundPath as string).replaceAll("\\", "/");
    const backgroundCss = `
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

  filter: opacity(${backgroundOpacity}%)
  blur(${backgroundBlur}px)
  brightness(${backgroundBrightness}%)
  contrast(${backgroundContrast}%);

  background-image: url("${backgroundPath}");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}`;
    const uiFontCss = `
body {
  font-family: "${uiFontFamily}";
  font-size: ${uiFontSize}px;
}
`;
    const uiCloseBtnFixCss = `
app-root>.content .tab-bar>.tabs tab-header button {
  /*left: 8px;*/
  font-family: "Source Sans Pro";
}`;
    return `
${divider}
${backgroundEnabled ? backgroundCss : ""}
${uiFontEnable && uiFontTabBarCloseBtnFix ? uiCloseBtnFixCss : ""}
${uiFontEnable ? uiFontCss : ""}
${divider}
`;
  }

  removeCss() {
    // const css: string = this.config.store?.appearance?.css;
    const css: string = this.backgroundCss;
    if (!css) {
      return;
    }
    const divided = css.split(divider);
    if (divided.length <= 1) {
      return;
    }
    const newCss = divided[0] + divided[2];
    // this.config.store.appearance.css = newCss.trim();
    this.backgroundCss = newCss.trim();
    this.config.save();
  }

  appendCss() {
    const append = this.buildCss();
    // this.config.store.appearance.css += append;
    this.backgroundCss += append;
    this.config.save();
  }

  applyCss() {
    this.removeCss();
    this.appendCss();

    this.styleElement.innerHTML = this.backgroundCss;
    this.logger.info("background applied.");
  }

  bootstrap() {
    setTimeout(() => {
      this.applyCss();
    }, 100);
  }
}
