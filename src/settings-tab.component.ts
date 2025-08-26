import { Component, OnDestroy } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { BackgroundService } from "./background.service";
import { AdvancedBackground, BackgroundPluginConfig } from "./config.provider";
import { ToastrService } from "ngx-toastr";
import { ConfigService, PlatformService, TranslateService } from "tabby-core";
import { ElectronHostWindow, ElectronService } from "tabby-electron";
import { debounce } from "utils-decorators";

/** @hidden */
@Component({
  template: require("./settings-tab.component.html"),
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
      .list-group-item-background {
        // --bs-list-group-action-hover-bg: rgba(0, 0, 0, 0.55);
        // backdrop-filter: blur(3px);

        --bs-list-group-bg: rgba(0, 0, 0, 0.25);
        --bs-list-group-action-hover-bg: rgba(0, 0, 0, 0.65);
      }
      .close {
        // font-size: 1.4rem;
        opacity: 0.1;
        transition: opacity 0.3s;
      }
      .nav-link:hover > .close {
        opacity: 0.8;
      }
      .add-button {
        opacity: 0.4;
      }
      .add-button:hover {
        opacity: 0.9;
      }
    `,
  ],
})
export class BackgroundSettingsTabComponent implements OnDestroy {
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
      title: "Active split panel dimming",
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

  pluginConfig: BackgroundPluginConfig;
  fonts: string[];

  constructor(
    public config: ConfigService,
    private background: BackgroundService,
    private electron: ElectronService,
    private hostWindow: ElectronHostWindow,
    private toastr: ToastrService,
    private translate: TranslateService,
    private platform: PlatformService
  ) {
    this.pluginConfig = this.config.store.backgroundPlugin;
  }
  async ngOnInit() {
    this.fonts = await this.platform.listFonts();
  }
  ngOnDestroy(): void {
    this.background.leavePreviewMode();
  }

  async pickFile(background?: AdvancedBackground): Promise<void> {
    const isFolder = background?.isFolder;

    const paths = this.electron.dialog.showOpenDialogSync(this.hostWindow.getWindow(), {
      filters: isFolder
        ? undefined
        : [
            { name: "Images", extensions: ["jpg", "png", "gif"] },
            { name: "All Files", extensions: ["*"] },
          ],
      properties: [isFolder ? "openDirectory" : "openFile", "showHiddenFiles"],
    });
    if (paths && paths[0]) {
      if (background) {
        background.backgroundPath = paths[0];
      } else {
        this.config.store.backgroundPlugin.backgroundPath = paths[0];
      }
      this.apply();
    }
  }

  apply() {
    this.background.apply();
    // this.toastr.info(this.translate.instant("Background applied!"));
  }

  dropBackgroundItem(event: CdkDragDrop<AdvancedBackground[]>) {
    moveItemInArray(this.pluginConfig.backgrounds, event.previousIndex, event.currentIndex);
    this.apply();
  }

  addBackground() {
    this.background.addBackground();
  }

  delBackground(i: number) {
    this.background.delBackground(i);
  }

  previewBackground(i: number) {
    this.background.enterPreviewMode(i);
  }

  exportBackgroundAdvancedSettings() {}
  importBackgroundAdvancedSettings() {}
}
