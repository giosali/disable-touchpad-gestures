import GLib from "gi://GLib";
import Gio from "gi://Gio";
import Meta from "gi://Meta";
import Shell from "gi://Shell";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

export default class DisableTouchpadGesturesExtension extends Extension {
  // TODO: handle later.
  gsettings?: Gio.Settings;
  animationsEnabled: boolean = true;

  enable() {
    // TODO: handle later.
    this.gsettings = this.getSettings();
    this.animationsEnabled =
      this.gsettings!.get_value("padding-inner").deepUnpack() ?? 8;
  }

  disable() {
    // TODO: handle later.
    this.gsettings = undefined;
  }
}
