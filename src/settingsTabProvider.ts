import { Injectable } from "@angular/core";
import { SettingsTabProvider } from "tabby-settings";
import { BackgroundSettingsTabComponent } from "./settingsTab.component";

/** @hidden */
@Injectable()
export class BackgroundSettingsTabProvider extends SettingsTabProvider {
  id = "tabby-background";
  icon = "image";
  title = "Background";

  constructor() {
    super();
  }

  getComponentType(): any {
    return BackgroundSettingsTabComponent;
  }
}
