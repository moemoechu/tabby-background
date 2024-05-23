import { Component } from "@angular/core";
import { BackgroundService } from "background.service";
import { ToastrService } from "ngx-toastr";
import { ConfigService, TranslateService } from "tabby-core";
import { ElectronHostWindow, ElectronService } from "tabby-electron";
import { debounce } from "utils-decorators";

/** @hidden */
@Component({
  template: require("./settingsTab.component.html"),
  styles: [
    `
      .font-size-input {
        width: 100px;
        flex: none;
      }
      .param-input {
        width: 70px;
        flex: none;
      }

      .font-family-input {
        min-width: 150px;
        // flex: none;
      }

      .background-input {
        min-width: 300px;
        // flex: none;
      }
    `,
  ],
})
export class BackgroundSettingsTabComponent {
  filters: any[] = [
    {
      title: "Background opacity",
      description: "Unit: %, 100 = disable",
      model: "backgroundOpacity",
      default: "100",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "Background blur",
      description: "Unit: px, 0 = disable",
      model: "backgroundBlur",
      default: "0",
      min: "0",
      max: "10",
      step: "0.1",
    },
    {
      title: "Background brightness",
      description: "Unit: %, 100 = disable",
      model: "backgroundBrightness",
      default: "100",
      min: "0",
      max: "200",
      step: "1",
    },
    {
      title: "Background contrast",
      description: "Unit: %, 100 = disable",
      model: "backgroundContrast",
      default: "100",
      min: "0",
      max: "500",
      step: "1",
    },
    {
      title: "Background grayscale",
      description: "Unit: %, 0 = disable",
      model: "backgroundGrayscale",
      default: "0",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "Background hue rotate",
      description: "Unit: degree, 0 = disable",
      model: "backgroundHueRotate",
      default: "0",
      min: "0",
      max: "360",
      step: "1",
    },
    {
      title: "Background invert",
      description: "Unit: %, 0 = disable",
      model: "backgroundInvert",
      default: "0",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "Background saturate",
      description: "Unit: %, 100 = disable",
      model: "backgroundSaturate",
      default: "100",
      min: "0",
      max: "1000",
      step: "1",
    },
    {
      title: "Background sepia",
      description: "Unit: %, 0 = disable",
      model: "backgroundSepia",
      default: "0",
      min: "0",
      max: "100",
      step: "1",
    },
  ];

  extraSettings: any[] = [
    {
      title: "Group list transparent",
      description: "Unit: %, 0 = disable, Apply to home menu and other group list",
      model: "backgroundListGroupTransparent",
      default: "0",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "Terminal toolbar transparent",
      description: "Unit: %, 0 = disable, Apply to terminal toolbar",
      model: "backgroundTerminalToolbarTransparent",
      default: "0",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "Home page footer transparent",
      description: "Unit: %, 50 = disable, Apply to home page footer",
      model: "backgroundFooterTransparent",
      default: "50",
      min: "0",
      max: "100",
      step: "1",
    },
  ];

  others: any[] = [
    // {
    //   title: "Tabs dynamic width min",
    //   description: "Unit: px, 0 = disable",
    //   model: "tabsFlexMinWidth",
    //   default: "200",
    //   min: "0",
    //   max: "1000",
    //   step: "1",
    // },
    // {
    //   title: "Tabs fixed width",
    //   description: "Unit: px, 200 = disable",
    //   model: "tabsFixedWidth",
    //   default: "200",
    //   min: "50",
    //   max: "1000",
    //   step: "1",
    // },
    {
      title: "Inactive split panel dimming",
      description: "Unit: %, 50 = default",
      model: "othersInactiveTabDimming",
      default: "50",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "Inactive split panel dimming",
      description: "Unit: %, 0 = default",
      model: "othersActiveTabDimming",
      default: "0",
      min: "0",
      max: "100",
      step: "1",
    },
    {
      title: "TabBar preserve space width",
      description: "Unit: px, 138 = disable",
      model: "othersTabBarPersistentSpaceMinWidth",
      default: "138",
      min: "0",
      max: "1000",
      step: "1",
    },
  ];

  constructor(
    public config: ConfigService,
    private background: BackgroundService,
    private electron: ElectronService,
    private hostWindow: ElectronHostWindow,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  async pickFile(): Promise<void> {
    const paths = (
      await this.electron.dialog.showOpenDialog(this.hostWindow.getWindow(), {
        filters: [
          { name: "Images", extensions: ["jpg", "png", "gif"] },
          { name: "All Files", extensions: ["*"] },
        ],
        properties: ["openFile", "showHiddenFiles"],
      })
    ).filePaths;
    if (paths[0]) {
      this.config.store.backgroundPlugin.backgroundPath = paths[0];
      this.apply();
    }
  }

  // 为了防止频繁保存可能导致的潜在的风险（其实没有），加入了防抖
  // @debounce(500)
  apply() {
    this.config.save();
    this.background.applyCss();
    // this.toastr.info(this.translate.instant("Background applied!"));
  }
}
