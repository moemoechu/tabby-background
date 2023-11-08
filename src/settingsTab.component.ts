import { Component } from "@angular/core";
import { BackgroundService } from "background.service";
import { ConfigService, TranslateService } from "tabby-core";
import { ElectronHostWindow, ElectronService } from "tabby-electron";

/** @hidden */
@Component({
  template: require("./settingsTab.component.pug"),
  styles: [
    `
      .font-size-input {
        width: 100px;
        flex: none;
      }

      .font-family-input {
        min-width: 150px;
        // flex: none;
      }

      .background-input {
        min-width: 350px;
        // flex: none;
      }
    `,
  ],
})
export class BackgroundSettingsTabComponent {
  constructor(public config: ConfigService, private background: BackgroundService, private electron: ElectronService, private hostWindow: ElectronHostWindow, private translate: TranslateService) {
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
  }

  async pickFile(): Promise<void> {
    const paths = (
      await this.electron.dialog.showOpenDialog(this.hostWindow.getWindow(), {
        properties: ["openFile", "showHiddenFiles"],
      })
    ).filePaths;
    if (paths[0]) {
      this.config.store.backgroundPlugin.backgroundPath = paths[0];
      // this.config.save();
      this.apply();
    }
  }
  apply() {
    this.config.save();
    this.background.applyCss();
  }
}
