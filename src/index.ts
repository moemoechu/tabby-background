import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import TabbyCoreModule, { ConfigProvider, ConfigService } from "tabby-core";
import { SettingsTabProvider } from "tabby-settings";

import { BackgroundService } from "./background.service";
import { BackgroundConfigProvider } from "./config.provider";
import { BackgroundSettingsTabComponent } from "./settings-tab.component";
import { BackgroundSettingsTabProvider } from "./settings-tab.provider";

@NgModule({
  imports: [CommonModule, FormsModule, TabbyCoreModule, NgbModule],
  providers: [
    { provide: ConfigProvider, useClass: BackgroundConfigProvider, multi: true },
    { provide: SettingsTabProvider, useClass: BackgroundSettingsTabProvider, multi: true },
  ],
  entryComponents: [BackgroundSettingsTabComponent],
  declarations: [BackgroundSettingsTabComponent],
})
export default class BackgroundModule {
  constructor(public config: ConfigService, private readonly background: BackgroundService) {}
}
