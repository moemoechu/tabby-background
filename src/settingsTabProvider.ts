import { Injectable } from "@angular/core";
import { SettingsTabProvider } from "tabby-settings";
import { BackgroundSettingsTabComponent } from "./settingsTab.component";

/** @hidden */
@Injectable()
export class BackgroundSettingsTabProvider extends SettingsTabProvider {
  id = "background";
  icon = "image";
  title = "背景";

  getComponentType(): any {
    return BackgroundSettingsTabComponent;
  }
}
