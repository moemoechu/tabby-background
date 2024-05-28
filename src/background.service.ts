import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import { BackgroundPluginConfig } from "./config.provider";
import * as cssBuilder from "./cssBuilder";
import { translations } from "./translations";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  private styleElement: HTMLStyleElement;
  private backgroundStyleElement: HTMLStyleElement;
  private uiFontStyleElement: HTMLStyleElement;
  private uiOtherStyleElement: HTMLStyleElement;

  constructor(
    public config: ConfigService,
    private logService: LogService,
    private translate: TranslateService
  ) {
    this.logger = this.logService.create("tabby-background");
    this.logger.info("BackgroundService ctor");
    
    this.backgroundStyleElement = document.createElement("style");
    this.backgroundStyleElement.id = "background";
    this.backgroundStyleElement.innerHTML = "";
    document.body.appendChild(this.backgroundStyleElement);
    this.uiFontStyleElement = document.createElement("style");
    this.uiFontStyleElement.id = "uiFont";
    this.uiFontStyleElement.innerHTML = "";
    document.body.appendChild(this.uiFontStyleElement);
    this.uiOtherStyleElement = document.createElement("style");
    this.uiOtherStyleElement.id = "uiOther";
    this.uiOtherStyleElement.innerHTML = "";
    document.body.appendChild(this.uiOtherStyleElement);

    this.styleElement = document.createElement("style");
    this.styleElement.id = "tabby-background";
    this.styleElement.innerHTML = "";
    document.body.appendChild(this.styleElement);
    this.config.ready$.subscribe(() => {
      this.logger.info("config ready");
      this.applyCss();
      setImmediate(() => {
        for (const translation of translations) {
          const [lang, trans] = translation;
          this.translate.setTranslation(lang, trans, true);
          this.logger.info("translate applied");
        }
      });
    });
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
}
