import { Component } from "@angular/core";
import { ConfigService } from "tabby-core";

const divider = "/* added by tabby-background plugin */";

/** @hidden */
@Component({
  template: require("./settingsTab.component.pug"),
  styles: [
    `
      color-scheme-preview {
        flex-shrink: 0;
        margin-bottom: 20px;
      }

      textarea {
        font-family: "Source Code Pro", monospace;
        min-height: 300px;
      }

      .font-size-input {
        width: 100px;
        flex: none;
      }
    `,
  ],
})
export class BackgroundSettingsTabComponent {
  constructor(public config: ConfigService) {
    // console.log(this.config.store.backgroundPlugin);
    // this.switchCss();
  }

  switchCss() {
    if (this.config.store.backgroundPlugin.backgroundEnabled) {
      this.applyCss();
    } else {
      this.removeCss();
    }
  }

  buildCss() {
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

  filter: opacity(${this.config.store.backgroundPlugin.backgroundOpacity}%)
  blur(${this.config.store.backgroundPlugin.backgroundBlur}px)
  brightness(${this.config.store.backgroundPlugin.backgroundBrightness}%)
  contrast(${this.config.store.backgroundPlugin.backgroundContrast}%);
  background-image: url("${(this.config.store.backgroundPlugin.backgroundPath as string).replace("\\", "/")}");
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
    this.removeCss();
    this.appendCss();
  }
}
