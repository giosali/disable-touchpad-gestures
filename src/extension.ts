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
      Main.overview._swipeTracker._touchpadGesture
    );

    // Disables or enables the overview touchpad gesture depending
    // on settings.
    const variant = this.settings.get_value(
      "disable-overview-touchpad-gesture"
    );
    if (variant.get_type_string() === "b") {
      const value: boolean = variant.get_boolean();
      value
        ? this.overviewTouchpadGesture?.disable()
        : this.overviewTouchpadGesture?.enable();
    }

    this.settings?.connect(
      "changed::disable-overview-touchpad-gesture",
      this.overviewTouchpadGesture?.onSettingChanged.bind(
        this.overviewTouchpadGesture
      )
    );
  }

  disable() {
    this.overviewTouchpadGesture?.enable();
    this.overviewTouchpadGesture = null;

    this.settings = null;
  }
}
