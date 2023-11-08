import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger, TranslateService } from "tabby-core";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  private styleElement: HTMLStyleElement;
  constructor(public config: ConfigService, private logService: LogService, private translate: TranslateService) {
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
}`;
    const uiCloseBtnFixCss = `
app-root>.content .tab-bar>.tabs tab-header button {
  /*left: 8px;*/
  font-family: "Source Sans Pro";
}`;
    return `/* added by tabby-background plugin */
${backgroundEnabled ? backgroundCss : ""}
${uiFontEnable && uiFontTabBarCloseBtnFix ? uiCloseBtnFixCss : ""}
${uiFontEnable ? uiFontCss : ""}`;
  }

  applyCss() {
    this.styleElement.innerHTML = this.buildCss();
    this.logger.info("Background applied.");
  }

  bootstrap() {
    setTimeout(() => {
      this.applyCss();
      this.translate.setTranslation(
        "zh-CN",
        {
          Background: "背景",
          "Enable background": "是否启用背景图片",
          "Background path": "背景图片路径",
          "Background opacity(%)": "背景透明度(%)",
          "Background blur(px)": "背景模糊度(px)",
          "Background brightness(%)": "背景亮度(%)",
          "Background contrast(%)": "背景对比度(%)",

          "UI Font": "字体",
          "Enable UI font replace": "是否启用界面字体替换",
          "Do not affect the terminal font, the terminal font still uses the font in the [appearance] configuration": "不影响终端字体，终端字体仍使用【外观】配置中的字体",
          "UI Font Family": "界面字体",
          "Fix close button font": "修复标签页关闭按钮字体",
          "After enable, restore the tab closing button to the default style": "启用后将标签页关闭按钮恢复为默认样式",
        },
        true
      );
    }, 300);
  }
}
