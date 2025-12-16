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

    // Page.
    const page = new Adw.PreferencesPage({
      title: _("General"),
      iconName: "dialog-information-symbolic",
    });

    // Groups.
    const gestureGroup = new Adw.PreferencesGroup({
      title: _("Touchpad Gestures"),
      description: _("Disable or enable touchpad gestures"),
    });
    page.add(gestureGroup);

    // Settings.
    const overviewTouchpadGestureDisabled = new Adw.SwitchRow({
      title: _("Overview touchpad gesture"),
      subtitle: _(
        "Disables the upward, 3-finger gesture that activates the Activities overview"
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
