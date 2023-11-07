import { Component } from "@angular/core";
import { BackgroundService } from "background.service";
import { ConfigService } from "tabby-core";

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
  constructor(public config: ConfigService, private readonly background: BackgroundService) {}

  apply() {
    this.config.save();
    this.background.applyCss();
  }
}
