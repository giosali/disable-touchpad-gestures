import Adw from "gi://Adw";
import Gio from "gi://Gio";
import {
  ExtensionPreferences,
  gettext as _,
} from "resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js";

// Extends the window type to include custom property.
interface ExtendedPreferencesWindow extends Adw.PreferencesWindow {
  _settings?: Gio.Settings;
}

export default class GnomeRectanglePreferences extends ExtensionPreferences {
  fillPreferencesWindow(window: Adw.PreferencesWindow) {
    const extendedWindow = window as ExtendedPreferencesWindow;
    const settings = this.getSettings();
    extendedWindow._settings = settings;

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

    settings!.bind(
      "disable-overview-touchpad-gesture",
      overviewTouchpadGestureDisabled,
      "active",
      Gio.SettingsBindFlags.DEFAULT
    );
  }
}
