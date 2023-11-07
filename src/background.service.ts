import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger } from "tabby-core";

const divider = "/* added by tabby-background plugin */";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  private styleElement: HTMLStyleElement;
  constructor(public config: ConfigService, private logService: LogService) {
    this.logger = this.logService.create("tabby-background");
    this.logger.info("BackgroundService ctor.");
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

  applyCss(save: boolean = true) {
    if (save) {
      this.config.save();
      this.logger.info("Config saved.");
    }
    this.styleElement.innerHTML = this.buildCss();
    this.logger.info("Background applied.");
  }

  bootstrap() {
    setTimeout(() => {
      this.applyCss(false);
    }, 300);
  }
}
