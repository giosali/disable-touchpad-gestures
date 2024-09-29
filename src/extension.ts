import Clutter from "gi://Clutter";

import { Extension } from "resource:///org/gnome/shell/extensions/extension.js";

import * as Main from "resource:///org/gnome/shell/ui/main.js";

export default class DisableTouchpadGesturesExtension extends Extension {
  enable() {
    const stage = global.stage as any;
    stage.disconnectObject(Main.overview._swipeTracker._touchpadGesture);
    stage.connectObject(
      "captured-event::touchpad",
      (_: Clutter.Actor, __: Clutter.Event) => {},
      Main.overview._swipeTracker._touchpadGesture
    );
  }

  disable() {
    const gesture = Main.overview._swipeTracker._touchpadGesture;
    const stage = global.stage as any;
    stage.disconnectObject(gesture);
    stage.connectObject(
      "captured-event::touchpad",
      gesture._handleEvent.bind(gesture),
      gesture
    );
  }
}
