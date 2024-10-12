import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import Gio from "gi://Gio";

export default class TouchpadGesture {
  private readonly event: string = "captured-event::touchpad";
  private gesture: any;

  constructor(gesture: any) {
    this.gesture = gesture;
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

  public onSettingChanged(settings: Gio.Settings, key: string): void {
    const variant: GLib.Variant<any> = settings.get_value(key);
    if (variant.get_type_string() === "b") {
      const value: boolean = variant.get_boolean();
      value ? this.disable() : this.enable();
    }
  }

  private getStage(): any {
    const stage = global.stage as any;
    return stage;
  }
}
