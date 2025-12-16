import Gio from "gi://Gio";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

import TouchpadGesture from "./touchpadGesture.js";

export default class DisableTouchpadGesturesExtension extends Extension {
  overviewTouchpadGesture?: TouchpadGesture | null;
  settings?: Gio.Settings | null;

  enable() {
    this.settings = this.getSettings();

    this.overviewTouchpadGesture = new TouchpadGesture(
      Main.overview._swipeTracker._touchpadGesture,
      this.settings,
      "disable-overview-touchpad-gesture"
    );
  }

  disable() {
    this.overviewTouchpadGesture?.enable();
    this.overviewTouchpadGesture = null;

    this.settings = null;
  }
}
