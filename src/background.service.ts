import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger } from "tabby-core";

const divider = "/* added by tabby-background plugin */";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  constructor(public config: ConfigService, private logService: LogService) {
    this.logger = this.logService.create("tabby-background");
    this.logger.info("BackgroundService ctor.");
    // console.log(document.querySelector("style#custom-css")!.innerHTML);
  }

  buildCss() {
    const { backgroundOpacity, backgroundBlur, backgroundBrightness, backgroundContrast } = this.config.store.backgroundPlugin;
    const backgroundPath = (this.config.store.backgroundPlugin.backgroundPath as string).replace("\\", "/");
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
    return `
${divider}
${backgroundCss}
${divider}
`;
  }

  checkCss() {
    const css: string = this.config.store?.appearance?.css;
    if (!css) {
      return false;
    }
    const divided = css.split(divider);
    if (divided.length > 1) {
      return true;
    }
    return false;
  }

  removeCss() {
    if (this.checkCss()) {
      const css: string = this.config.store?.appearance?.css;
      const divided = css.split(divider);
      const newCss = divided[0] + divided[2];
      this.config.store.appearance.css = newCss.trim();
      this.config.save();
    }
  }

  appendCss() {
    const append = this.buildCss();
    this.config.store.appearance.css += append;
    this.config.save();
  }

  applyCss() {
    if (this.config.store.backgroundPlugin.backgroundEnabled) {
      this.removeCss();
      this.appendCss();
    } else {
      this.removeCss();
    }
    this.logger.info("background applied.");
  }

  bootstrap() {
    setTimeout(() => {
      this.applyCss();
    }, 100);
  }
}
