import Gtk from "gi://Gtk";
import Adw from "gi://Adw";
import Gio from "gi://Gio";
import {
  ExtensionPreferences,
  gettext as _,
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

export default class GnomeRectanglePreferences extends ExtensionPreferences {
  _settings?: Gio.Settings;

  fillPreferencesWindow(window: Adw.PreferencesWindow) {
    this._settings = this.getSettings();

    const page = new Adw.PreferencesPage({
      title: _("General"),
      iconName: "dialog-information-symbolic",
    });

    const gestureGroup = new Adw.PreferencesGroup({
      title: _("Gestures"),
      description: _("Configure touchpad gestures"),
    });
    page.add(gestureGroup);

    const overviewTouchpadGestureDisabled = new Adw.SwitchRow({
      title: _("Disabled"),
      subtitle: _(
        "Whether to disable the upward, 3-finger touchpad that activates the overview"
      ),
    });
    gestureGroup.add(overviewTouchpadGestureDisabled);

    window.add(page);

    this._settings!.bind(
      "disable-overview-touchpad-gesture",
      overviewTouchpadGestureDisabled,
      "active",
      Gio.SettingsBindFlags.DEFAULT
    );
  }
}
