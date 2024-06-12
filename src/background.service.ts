import { Injectable } from "@angular/core";
import { ConfigService, LogService, Logger, TranslateService } from "tabby-core";
import {
  AdvancedBackground,
  Background,
  BackgroundPluginConfig,
  DefaultBackground,
} from "./config.provider";
import { translations } from "./translations";
import * as uuid from "uuid";

@Injectable({ providedIn: "root" })
export class BackgroundService {
  private logger: Logger;
  private styleElement: HTMLStyleElement;
  private backgroundStyleElement: HTMLStyleElement;
  private uiFontStyleElement: HTMLStyleElement;
  private uiOtherStyleElement: HTMLStyleElement;
  pluginConfig: BackgroundPluginConfig;
  private backgroundTimer: NodeJS.Timeout;
  private transitionTimer: NodeJS.Timeout;
  private previewMode: boolean;
  private previewIndex: number;
  private slideShowList: string[];
  private slideShowCurrentIndex: number;

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

    this.previewMode = false;
    this.slideShowList = [];

    this.config.ready$.subscribe(() => {
      this.logger.info("config ready");
      this.pluginConfig = this.config.store.backgroundPlugin;
      this.applyStyle();
      setImmediate(() => {
        for (const translation of translations) {
          const [lang, trans] = translation;
          this.translate.setTranslation(lang, trans, true);
          this.logger.info("translate applied");
        }
      });
    });
  }

  clearStyle() {
    this.backgroundStyleElement.innerHTML = "";
    this.uiFontStyleElement.innerHTML = "";
    this.uiOtherStyleElement.innerHTML = "";
    this.leaveSlideShow();
  }

  applyStyle() {
    this.clearStyle();

    // this.styleElement.innerHTML = this.buildCss();
    this.uiFontStyleElement.innerHTML = this.buildUiFontCss();
    this.uiOtherStyleElement.innerHTML = this.buildOthersCss();
    if (this.pluginConfig.backgroundMode === "simple") {
      const backgroundCss = this.buildBackgroundCss(this.pluginConfig);
      this.backgroundStyleElement.innerHTML = backgroundCss;
    } else if (this.pluginConfig.backgroundMode === "advanced") {
      if (this.previewMode) {
        this.applyBackgroundPreview();
        return;
      }
      if (this.pluginConfig.backgroundAdvancedSwitchType === "slideshow") {
        this.enterSlideShow();
      }
    }
    this.logger.info("Background applied.");
  }

  apply() {
    this.config.save();
    this.applyStyle();
  }

  applyBackground(id: string, updateTimestamp = true) {
    this.backgroundStyleElement.innerHTML = this.backgroundStyleElement.innerHTML.replace(
      /\/\*background-opacity-placeholder\*\/.*/,
      "/*background-opacity-placeholder*/opacity: 0;"
    );
    setTimeout(() => {
      this.backgroundStyleElement.innerHTML = this.buildBackgroundCss(this.getBackgroundByID(id));
      setTimeout(() => {
        this.backgroundStyleElement.innerHTML = this.backgroundStyleElement.innerHTML.replace(
          /\/\*background-opacity-placeholder\*\/.*/,
          "/*background-opacity-placeholder*/opacity: 1;"
        );
      }, 500);
    }, 500);

    this.pluginConfig.backgroundAdvancedCurrentId = id;
    if (updateTimestamp) {
      this.pluginConfig.backgroundLastChangedTime = Date.now();
    }
    this.config.save();
  }
  applyBackgroundPreview() {
    this.backgroundStyleElement.innerHTML = this.buildBackgroundCss(
      this.pluginConfig.backgrounds[this.previewIndex]
    ).replace(
      /\/\*background-opacity-placeholder\*\/.*/,
      "/*background-opacity-placeholder*/opacity: 1;"
    );
  }

  addBackground() {
    const newBackground: AdvancedBackground = Object.assign({}, DefaultBackground);
    newBackground.id = uuid.v4();
    newBackground.name = `bg${this.pluginConfig.backgrounds.length}`;
    this.pluginConfig.backgrounds.unshift(newBackground);
    this.logger.debug(`background ${newBackground.id} added...`);
    this.apply();
  }

  delBackground(i: number) {
    this.pluginConfig.backgrounds.splice(i, 1);
    this.apply();
  }

  getBackgroundByID(id: string) {
    const background = this.pluginConfig.backgrounds.find((value) => value.id === id);
    return background;
  }

  buildSlideShowList() {
    this.slideShowList = this.pluginConfig.backgrounds
      .filter((value) => value.enabled)
      .map((value) => value.id);
    if (this.pluginConfig.backgroundAdvancedChooseType === "sequence") {
    } else if (this.pluginConfig.backgroundAdvancedChooseType === "reverse") {
      this.slideShowList.reverse();
    } else if (this.pluginConfig.backgroundAdvancedChooseType === "random") {
      this.slideShowList.sort(() => Math.random() - 0.5);
    }
    this.slideShowCurrentIndex = this.slideShowList.findIndex(
      (value) => value === this.pluginConfig.backgroundAdvancedCurrentId
    );
    if (this.slideShowCurrentIndex === -1) {
      this.slideShowCurrentIndex = 0;
      this.pluginConfig.backgroundAdvancedCurrentId =
        this.slideShowList[this.slideShowCurrentIndex];
    }
  }

  enterSlideShow() {
    const handler = () => {
      this.slideShowCurrentIndex++;
      if (this.slideShowCurrentIndex > this.slideShowList.length - 1) {
        this.slideShowCurrentIndex = 0;
      }
      this.applyBackground(this.slideShowList[this.slideShowCurrentIndex]);
      this.backgroundTimer = setTimeout(
        handler,
        this.pluginConfig.backgroundAdvancedSlideshowInterval * 1000
      );
    };
    this.leaveSlideShow();
    this.buildSlideShowList();
    if (this.slideShowList.length === 0) {
      return;
    }

    const leftTime =
      this.pluginConfig.backgroundAdvancedSlideshowInterval * 1000 -
      (Date.now() - this.pluginConfig.backgroundLastChangedTime);
    if (leftTime > 0) {
      this.logger.info(`${leftTime / 1000} second left to change background`);
      this.applyBackground(this.slideShowList[this.slideShowCurrentIndex], false);
      this.backgroundTimer = setTimeout(handler, leftTime);
    } else {
      handler();
    }
  }

  leaveSlideShow() {
    if (this.backgroundTimer) {
      clearTimeout(this.backgroundTimer);
      this.backgroundTimer = undefined;
    }
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = undefined;
    }
  }

  enterPreviewMode(i: number) {
    this.previewMode = true;
    this.previewIndex = i;
    this.applyStyle();
  }

  leavePreviewMode() {
    this.previewMode = false;
    this.applyStyle();
  }

  buildBackgroundCss(background: Background) {
    const { backgroundPath, backgroundShowType } = background;
    const { backgroundFullscreenType, backgroundFullscreenRepeatType } = background;
    const {
      backgroundFloatSize,
      backgroundFloatX,
      backgroundFloatY,
      backgroundFloatXAlign,
      backgroundFloatYAlign,
    } = background;
    const {
      backgroundOpacity,
      backgroundBlur,
      backgroundBrightness,
      backgroundContrast,
      backgroundGrayscale,
      backgroundHueRotate,
      backgroundInvert,
      backgroundSaturate,
      backgroundSepia,
      backgroundDropShadowEnabled,
      backgroundDropShadowX,
      backgroundDropShadowY,
      backgroundDropShadowBlur,
      backgroundDropShadowColor,
    } = background;
    const {
      backgroundListGroupTransparent,
      backgroundTerminalToolbarTransparent,
      backgroundFooterTransparent,
    } = background;

    const css = `
/* added by tabby-background plugin */
/* background */
.content-tab-active {
  background: none;
}
.content-tab-active::after {
  content: ""; position: fixed; left: 0; right: 0; z-index: -2; display: block; width: 100%; height: 100%;
  background: var(--body-bg);
}
start-page.content-tab-active::after {
  background: var(--theme-bg-more-2);
}
.content-tab-active::before {
  /*background-opacity-placeholder*/opacity: 0;
  content: ""; position: fixed; left: 0; right: 0; z-index: -1; display: block; width: 100%; height: 100%;
  filter:${
    (backgroundOpacity === 100 ? "" : ` opacity(${backgroundOpacity}%)`) +
    (backgroundBlur === 0 ? "" : ` blur(${backgroundBlur}px)`) +
    (backgroundBrightness === 100 ? "" : ` brightness(${backgroundBrightness}%)`) +
    (backgroundContrast === 100 ? "" : ` contrast(${backgroundContrast}%)`) +
    (backgroundGrayscale === 0 ? "" : ` grayscale(${backgroundGrayscale}%)`) +
    (backgroundHueRotate === 0 ? "" : ` hue-rotate(${backgroundHueRotate}deg)`) +
    (backgroundInvert === 0 ? "" : ` invert(${backgroundInvert}%)`) +
    (backgroundSaturate === 100 ? "" : ` saturate(${backgroundSaturate}%)`) +
    (backgroundSepia === 0 ? "" : ` sepia(${backgroundSepia}%)`) +
    (backgroundShowType === "float" && backgroundDropShadowEnabled
      ? ` drop-shadow(${backgroundDropShadowX}px ${backgroundDropShadowY}px ${backgroundDropShadowBlur}px ${backgroundDropShadowColor})`
      : "") +
    ";"
  }
  background-image: url("${backgroundPath.replaceAll("\\", "/")}");
  transition: opacity 0.5s ease-in-out;
${(() => {
  if (backgroundShowType === "fullscreen") {
    return `
  background-repeat: ${backgroundFullscreenRepeatType};
  background-position: center;
  background-size: ${backgroundFullscreenType};`;
  } else if (backgroundShowType === "float") {
    return `
  background-repeat: no-repeat;
  background-position: 
  ${
    backgroundFloatXAlign === "center"
      ? backgroundFloatXAlign
      : `${backgroundFloatXAlign} ${backgroundFloatX}px`
  } 
  ${
    backgroundFloatYAlign === "center"
      ? backgroundFloatYAlign
      : `${backgroundFloatYAlign} ${backgroundFloatY}px`
  }; 
  background-size: ${backgroundFloatSize}px;`;
  } else {
    throw new Error("ShowType Error!");
  }
})()}
}
/* group list */
${
  backgroundListGroupTransparent > 0
    ? `
.list-group {
  --bs-list-group-bg: color-mix(in srgb, var(--theme-bg-more) ${
    100 - backgroundListGroupTransparent
  }%, transparent);
}`.trim()
    : ""
}
/* toolbar */
${
  backgroundTerminalToolbarTransparent > 0
    ? `
terminal-toolbar {
  background: color-mix(in srgb, var(--bs-body-bg) ${
    100 - backgroundTerminalToolbarTransparent
  }%, transparent) !important;
}`.trim()
    : ""
}
/* footer */
${
  backgroundFooterTransparent !== 50
    ? `
footer {
  background: color-mix(in srgb, rgba(0,0,0,1) ${
    100 - backgroundFooterTransparent
  }%, transparent) !important;
}`.trim()
    : ""
}`.trim();
    return css;
  }

  buildUiFontCss() {
    const { uiFontEnabled, uiFontFamily, uiFontSize, uiFontTabBarCloseBtnFix } = this.pluginConfig;
    if (!uiFontEnabled) {
      return "";
    }
    const uiFontCss = `
/* added by tabby-background plugin */
body {
  font-family: "${uiFontFamily}";
  font-size: ${uiFontSize}px;
}
${
  uiFontTabBarCloseBtnFix
    ? `
app-root>.content .tab-bar>.tabs tab-header button {
  /*left: 8px;*/
  font-family: "Source Sans Pro";
}`.trim()
    : ""
}`.trim();
    return uiFontCss;
  }

  buildOthersCss() {
    const {
      othersInactiveTabDimming,
      othersActiveTabDimming,
      othersTabBarPersistentSpaceMinWidth,
    } = this.pluginConfig;

    const othersCss = `
/* added by tabby-background plugin */
/* tab dimming settings */
${
  othersInactiveTabDimming !== 50
    ? `
split-tab>.child {
  opacity: ${(100 - othersInactiveTabDimming) / 100};
}`.trim()
    : ""
}
${
  othersActiveTabDimming !== 0
    ? `
split-tab>.child.focused {
  opacity: ${(100 - othersActiveTabDimming) / 100};
}`.trim()
    : ""
}
/* tabbar settings */
${
  othersTabBarPersistentSpaceMinWidth !== 138
    ? `
.btn-space.persistent {
  min-width: ${othersTabBarPersistentSpaceMinWidth}px !important;
}
`.trim()
    : ""
}`.trim();

    return othersCss;
  }
}

// export function tabsFlexMinWidth(width: number) {
//   return `
// .flex-width {
//   min-width: ${width}px;
// }\n`;
// }

// export function tabsFixedWidth(width: number) {
//   return `
// tab-header {
//   width: ${width}px !important;
// }\n`;
// }
