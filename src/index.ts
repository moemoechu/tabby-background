import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import TabbyCoreModule, { ConfigProvider, ConfigService } from "tabby-core";
import { SettingsTabProvider } from "tabby-settings";

import { BackgroundService } from "background.service";
import { BackgroundConfigProvider } from "./configProvider";
import { BackgroundSettingsTabComponent } from "./settingsTab.component";
import { BackgroundSettingsTabProvider } from "./settingsTabProvider";

@NgModule({
  imports: [CommonModule, FormsModule, TabbyCoreModule],
  providers: [
    { provide: ConfigProvider, useClass: BackgroundConfigProvider, multi: true },
    { provide: SettingsTabProvider, useClass: BackgroundSettingsTabProvider, multi: true },
  ],
  entryComponents: [BackgroundSettingsTabComponent],
  declarations: [BackgroundSettingsTabComponent],
})
export default class BackgroundModule {
  constructor(public config: ConfigService, private readonly background: BackgroundService) {
    this.background.bootstrap();
  }
}
