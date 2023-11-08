import { Injectable } from "@angular/core";
import { TranslateService } from "tabby-core";
import { SettingsTabProvider } from "tabby-settings";
import { BackgroundSettingsTabComponent } from "./settingsTab.component";

/** @hidden */
@Injectable()
export class BackgroundSettingsTabProvider extends SettingsTabProvider {
  id = "tabby-background";
  icon = "image";
  title = "Background";

  constructor(private translate: TranslateService) {
    super();
  }

  getComponentType(): any {
    return BackgroundSettingsTabComponent;
  }
}
