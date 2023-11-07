import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import TabbyCoreModule, { ConfigProvider, ConfigService, HotkeyProvider, TabContextMenuItemProvider } from "tabby-core";
import { SettingsTabProvider } from "tabby-settings";

import { BackgroundConfigProvider } from "./configProvider";
import { BackgroundSettingsTabProvider } from "./settingsTabProvider";
import { BackgroundSettingsTabComponent } from "./settingsTab.component";

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
  constructor() {
    console.log("Angular engaged, cap'n.");
  }
}
