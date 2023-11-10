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
    const {
      backgroundEnabled,
      backgroundShowType,
      backgroundFullscreenType,
      backgroundFullscreenRepeatType,
      backgroundFloatSize,
      backgroundFloatX,
      backgroundFloatY,
      backgroundFloatXAlign,
      backgroundFloatYAlign,
      backgroundOpacity,
      backgroundBlur,
      backgroundBrightness,
      backgroundContrast,
      backgroundListGroupTransparent,
      backgroundTerminalToolbarTransparent,
    } = backgroundPluginConfig;
    const { uiFontEnabled, uiFontFamily, uiFontSize, uiFontTabBarCloseBtnFix } =
      backgroundPluginConfig;
    const { tabsOverrideEnabled, tabsFlexMinWidth, tabsFixedWidth } = backgroundPluginConfig;
    const backgroundPath = backgroundPluginConfig.backgroundPath.replaceAll("\\", "/");

    let css = `/* added by tabby-background plugin */\n`;
    if (backgroundEnabled) {
      css += cssBuilder.background(
        backgroundPath,
        backgroundShowType,
        backgroundFullscreenType,
        backgroundFullscreenRepeatType,
        backgroundFloatSize,
        backgroundFloatX,
        backgroundFloatY,
        backgroundFloatXAlign,
        backgroundFloatYAlign,
        backgroundOpacity,
        backgroundBlur,
        backgroundBrightness,
        backgroundContrast
      );

      if (backgroundListGroupTransparent > 0) {
        css += cssBuilder.backgroundListGroupTransparent(backgroundListGroupTransparent);
      }
      if (backgroundTerminalToolbarTransparent > 0) {
        css += cssBuilder.backgroundTerminalToolbarTransparent(
          backgroundTerminalToolbarTransparent
        );
      }
    }

    if (uiFontEnabled) {
      css += cssBuilder.uiFont(uiFontFamily, uiFontSize);
      if (uiFontTabBarCloseBtnFix) {
        css += cssBuilder.uiCloseBtnFix();
      }
    }

    if (tabsOverrideEnabled) {
      css += cssBuilder.tabsFlexMinWidth(tabsFlexMinWidth);
      css += cssBuilder.tabsFixedWidth(tabsFixedWidth);
    }

    return css;
  }

  applyCss() {
    this.styleElement.innerHTML = this.buildCss();
    this.logger.info("Background applied.");
  }

  bootstrap() {
    setTimeout(() => {
      this.applyCss();
      for (const translation of translations) {
        const [lang, trans] = translation;
        this.translate.setTranslation(lang, trans, true);
      }
    }, 300);
  }
}
