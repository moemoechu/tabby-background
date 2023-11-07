import { Component } from "@angular/core";
import { BackgroundService } from "background.service";
import { ConfigService } from "tabby-core";
import { ElectronHostWindow, ElectronService } from "tabby-electron";

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
  constructor(public config: ConfigService, private readonly background: BackgroundService, private electron: ElectronService, private hostWindow: ElectronHostWindow) {}

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
