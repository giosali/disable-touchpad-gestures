import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import Gio from "gi://Gio";

export default class TouchpadGesture {
  private event: string | null = "captured-event::touchpad";
  private gesture: any;
  private handlerId: number | null;

  constructor(gesture: any, settings: Gio.Settings, key: string) {
    this.gesture = gesture;

    this.toggleSetting(settings, key);

    this.handlerId = settings.connect(
      `changed::${key}`,
      this.toggleSetting.bind(this)
    );
  }

  public destroy(settings: Gio.Settings): void {
    this.enable();

    this.event = null;
    this.gesture = null;
    if (this.handlerId !== null) {
      settings.disconnect(this.handlerId);
      this.handlerId = null;
    }
  }

  /**
   * Disables the actual, underlying touchpad gesture.
   */
  public disable(): void {
    const stage: any = this.getStage();
    stage.disconnectObject(this.gesture);
    stage.connectObject(
      this.event,
      (_: Clutter.Actor, __: Clutter.Event) => {},
      this.gesture
    );
  }

  /**
   * Enables the actual, underlying touchpad gesture.
   */
  public enable(): void {
    const stage: any = this.getStage();
    stage.disconnectObject(this.gesture);
    stage.connectObject(
      this.event,
      this.gesture._handleEvent.bind(this.gesture),
      this.gesture
    );
  }

  private getStage(): any {
    return global.stage as any;
  }

  /**
   * Disables or enables the Activities overview touchpad gesture depending on
   * settings.
   * @param settings
   * @param key
   */
  private toggleSetting(settings: Gio.Settings, key: string): void {
    try {
      const variant: GLib.Variant<any> = settings.get_value(key);
      if (variant.get_type_string() === "b") {
        const value: boolean = variant.get_boolean();
        value ? this.disable() : this.enable();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
