import * as amx from "@sa-mp/amx";
import {GameMode} from ".";

export class GameModeFunctions {
    public static set text(text: string) {
        amx.callNative("SetGameModeText", "s", text);
    }

    public static exit(): void {
        amx.callNative("GameModeExit", "");
    }

    public static set worldTime(hour: number) {
        amx.callNative("SetWorldTime", "i", hour);
    }

    public static set weather(weather: number) {
        amx.callNative("SetWeather", "i", weather);
    }

    public static set gravity(gravity: number) {
        amx.callNative("SetGravity", "f", gravity);   
    }

    public set text(text: string) {
        GameMode.text = text;
    }

    public exit(): void {
        GameMode.exit();
    }

    public set worldTime(hour: number) {
        GameMode.worldTime = hour;
    }

    public set weather(weather: number) {
        GameMode.weather = weather;
    }

    public set gravity(gravity: number) {
        GameMode.gravity = gravity;
    }
}