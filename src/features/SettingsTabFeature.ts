import { App, Plugin, PluginSettingTab, Setting, Value } from "obsidian";

import { Feature } from "./Feature";

import { SettingsService } from "../services/SettingsService";

class ObsidianZoomPluginSettingTab extends PluginSettingTab {
  constructor(app: App, plugin: Plugin, private settings: SettingsService) {
    super(app, plugin);
  }

  display(): void {
    const { containerEl } = this;

    containerEl.empty();

    new Setting(containerEl)
      .setName("Zooming in when clicking on the bullet")
      .addToggle((toggle) => {
        toggle.setValue(this.settings.zoomOnClick).onChange(async (value) => {
          this.settings.zoomOnClick = value;
          await this.settings.save();
        });
      });

    new Setting(containerEl)
      .setName("Debug mode")
      .setDesc(
        "Open DevTools (Command+Option+I or Control+Shift+I) to copy the debug logs."
      )
      .addToggle((toggle) => {
        toggle.setValue(this.settings.debug).onChange(async (value) => {
          this.settings.debug = value;
          await this.settings.save();
        });
      });

    new Setting(containerEl)
      .setName("Toggle between headings")
      .setDesc("Add the Heading Numbers to toggle between in the input box")
      .addText((text) => {
        const firstValue = this.settings.toggleHeadingValues[0];

        text.inputEl.type = "number";
        text.setValue(firstValue.toString());
        text.onChange(async (value) => {
          const num = Number(value);
          this.settings.toggleHeadingValues[0] = num;
          await this.settings.save();
        });
      })
      .addText((text) => {
        const secondValue = this.settings.toggleHeadingValues[1];

        text.inputEl.type = "number";
        text.setValue(secondValue.toString());
        text.onChange(async (value) => {
          const num = Number(value);
          this.settings.toggleHeadingValues[1] = num;
          await this.settings.save();
        });
      });
  }
}

export class SettingsTabFeature implements Feature {
  constructor(private plugin: Plugin, private settings: SettingsService) {}

  async load() {
    this.plugin.addSettingTab(
      new ObsidianZoomPluginSettingTab(
        this.plugin.app,
        this.plugin,
        this.settings
      )
    );
  }

  async unload() {}
}
