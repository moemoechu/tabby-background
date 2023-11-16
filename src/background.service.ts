import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import * as cssBuilder from "./cssBuilder";
import { translations } from "./translations";
import { BackgroundPluginConfig } from "configProvider";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  private styleElement: HTMLStyleElement;
  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService
  ) {
    this.logger = this.logService.create("tabby-background");
    this.logger.info("BackgroundService ctor.");
    this.styleElement = document.createElement("style");
    this.styleElement.id = "tabby-background";
    this.styleElement.innerHTML = "";
    document.body.appendChild(this.styleElement);
  }

  buildCss() {
    const backgroundPluginConfig = this.config.store.backgroundPlugin as BackgroundPluginConfig;
    let css = cssBuilder.background(backgroundPluginConfig);

    return css;
  }

  applyCss() {
    this.styleElement.innerHTML = this.buildCss();
    this.logger.info("Background applied.");
  }

  bootstrap() {
    // 启动时延时注入背景和翻译
    // 目前没有发现更好的方法，等一波探索（如果有时间）
    setTimeout(() => {
      this.applyCss();
      for (const translation of translations) {
        const [lang, trans] = translation;
        this.translate.setTranslation(lang, trans, true);
      }
    }, 300);
  }
}
