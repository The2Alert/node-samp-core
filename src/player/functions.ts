import * as amx from "@sa-mp/amx";
import {Player, PlayerMarkerModes, NetStats, Weapons, Position, Weapon, Menu, DialogOptions, WeaponStates, Actor, constants, PlayerStates, IKeys, PlayerTime, FightStyles, WeaponSkills, Vehicle, SampObject, PlayerShot, PlayerVariable, AnimationName, SpecialActions, Position2D, MapIconOptions, MapIconStyle, MapIcon, CameraStyles, PlayerObject, SpectateModes, RecordTypes, ExplosionOptions} from "..";

export interface AddPlayerClassOptions {
    skin: number;
    spawn: Position;
    angle: number;
    weapons: Weapon[];
}

export interface AddPlayerClassExOptions extends AddPlayerClassOptions {
    team: number;
}

export interface ShowDialogOptions extends DialogOptions {
    id: number;
}

export interface SetSpawnInfoOptions extends Position {
    team: number;
    skin: number;
    rotation: number;
    weapons: Weapon[];
}

export interface PlayerAudioOptions extends Partial<Position> {
    url: string;
    distance?: number;
    usePos?: boolean;
}

export interface RemoveBuildingForPlayerOptions extends Position {
    model: number;
    radius: number;
}

export interface PlayerAttachedObjectOptions {
    index: number;
    model: number;
    bone: number;
    offset?: Position;
    rot?: Position;
    scale?: Position;
    materialColors?: [number, number];
}

export interface PlayerChatBubbleOptions {
    text: string;
    color: number;
    drawDistance: number;
    expireTime: number;
}

export interface PlayerPlaySoundOptions extends Position {
    id: number;
}

export interface PlayerAnimationOptions {
    library: string;
    name: string;
    speed?: number;
    loop: boolean;
    lockX: boolean;
    lockY: boolean;
    freeze: boolean;
    time: number;
    forceSync: boolean;
}

export interface PlayerCheckpointOptions extends Position {
    size: number;
}

export interface PlayerRaceCheckpointOptions extends Position {
    type: number;
    next: Position;
    size: number;
}

export interface PlayerWorldBoundsOptions {
    min: Position2D;
    max: Position2D;
}

export interface PlayerMapIconOptions extends MapIconOptions {
    id: number;
}

export interface PlayerCameraLookAtOptions extends Position {
    style?: CameraStyles;
}

export interface InterpolateCameraPosOptions {
    from: Position;
    to: Position;
    time: number;
    style?: CameraStyles;
}

export class PlayerFunctions {
    public static sendToAll(message: string, color: number = 0xFFFFFFAA): void {
        amx.callNative("SendClientMessageToAll", "is", color, message);
    }

    public static sendDeath(killer: Player, killed: Player, weapon: Weapons): void {
        amx.callNative("SendDeathMessage", "iii", killer.id, killed.id, weapon);
    }

    public static gameTextForAll(text: string, time: number, style: number): void {
        amx.callNative("GameTextForAll", "sii", text, time, style);
    }

    public static get max(): number {
        return amx.callNative("GetMaxPlayers", "").retval;
    }

    public static get poolSize(): number {
        return amx.callNative("GetPlayerPoolSize", "").retval;
    }

    public static addClass({skin, spawn, angle, weapons}: AddPlayerClassOptions): number {
        const modelid = skin;
        const spawn_x = spawn.x;
        const spawn_y = spawn.y;
        const spawn_z = spawn.z;
        const z_angle = angle;
        const weapon1 = weapons[0]?.type ?? 0;
        const weapon1_ammo = weapons[0]?.ammo ?? 0;
        const weapon2 = weapons[1]?.type ?? 0;
        const weapon2_ammo = weapons[1]?.ammo ?? 0;
        const weapon3 = weapons[2]?.type ?? 0;
        const weapon3_ammo = weapons[2]?.ammo ?? 0;
        return amx.callNative("AddPlayerClass", "iffffiiiiii", modelid, spawn_x, spawn_y, spawn_z, z_angle, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo).retval;
    }

    public static addClassEx({team, skin, spawn, angle, weapons}: AddPlayerClassExOptions): number {
        const teamid = team;
        const modelid = skin;
        const spawn_x = spawn.x;
        const spawn_y = spawn.y;
        const spawn_z = spawn.z;
        const z_angle = angle;
        const weapon1 = weapons[0]?.type ?? 0;
        const weapon1_ammo = weapons[0]?.ammo ?? 0;
        const weapon2 = weapons[1]?.type ?? 0;
        const weapon2_ammo = weapons[1]?.ammo ?? 0;
        const weapon3 = weapons[2]?.type ?? 0;
        const weapon3_ammo = weapons[2]?.ammo ?? 0;
        return amx.callNative("AddPlayerClassEx", "iiffffiiiiii", teamid, modelid, spawn_x, spawn_y, spawn_z, z_angle, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo).retval;
    }

    public static showMarkers(mode: PlayerMarkerModes): void {
        amx.callNative("ShowPlayerMarkers", "i", mode);
    }

    public static getWeaponName(weapon: Weapons, length: number): string {
        return amx.callNative("GetWeaponName", "iSi", weapon, length, length)[0] as string;
    }

    public static usePedAnims(): void {
        amx.callNative("UsePlayerPedAnims", "");
    }

    public static setLimitMarkerRadius(radius: number): void {
        amx.callNative("LimitPlayerMarkerRadius", "f", radius);
    }

    public static set stuntBonus(enable: boolean) {
        amx.callNative("EnableStuntBonusForAll", "i", Number(enable));
    }

    constructor(public readonly id: number) {}

    public send(message: string = "", color: number = 0xFFFFFFAA): boolean {
        return Boolean(amx.callNative("SendClientMessage", "iis", this.id, color, message).retval);
    }

    public sendToPlayer(sender: Player, message: string): void {
        amx.callNative("SendPlayerMessageToPlayer", "iis", this.id, sender.id, message);
    }

    public sendToAll(message: string): void {
        amx.callNative("SendPlayerMessageToAll", "is", this.id, message);
    }

    public sendDeath(killer: Player, killed: Player, weapon: Weapons): boolean {
        return Boolean(amx.callNative("SendDeathMessageToPlayer", "iiii", this.id, killer.id, killed.id, weapon).retval);
    }

    public gameText(text: string, time: number, style: number): boolean {
        return Boolean(amx.callNative("GameTextForPlayer", "isii", this.id, text, time, style).retval);
    }

    public isAdmin(): boolean {
        return Boolean(amx.callNative("IsPlayerAdmin", "i", this.id).retval);
    }

    public kick(): void {
        amx.callNative("Kick", "i", this.id);
    }

    public ban(): boolean {
        return Boolean(amx.callNative("Ban", "i", this.id).retval);
    }

    public banEx(reason: string): boolean {
        return Boolean(amx.callNative("BanEx", "is", this.id, reason).retval);
    }

    public isNPC(): boolean {
        return Boolean(amx.callNative("IsPlayerNPC", "i", this.id).retval);
    }

    public getNetworkStats(length: number): string {
        return amx.callNative("GetPlayerNetworkStats", "iSi", this.id, length, length)[0] as string;
    }

    public getVersion(length: number): string {
        return amx.callNative("GetPlayerVersion", "iSi", this.id, length, length)[0] as string;
    }

    public get netStats(): NetStats {
        return new NetStats(this);
    }

    public get menu(): Menu {
        return new Menu(amx.callNative("GetPlayerMenu", "i", this.id).retval);
    }

    public dialog(options: ShowDialogOptions): boolean {
        const {id, style, caption, info, buttons: [button1, button2 = ""]} = options;
        return Boolean(amx.callNative("ShowPlayerDialog", "iiissss", this.id, id, style, caption, info, button1, button2).retval);
    }

    public spawnInfo(options: SetSpawnInfoOptions): void {
        const {team, skin, x, y, z, rotation, weapons} = options;
        const weapon1 = weapons[0]?.type ?? 0;
        const weapon1_ammo = weapons[0]?.ammo ?? 0;
        const weapon2 = weapons[1]?.type ?? 0;
        const weapon2_ammo = weapons[1]?.ammo ?? 0;
        const weapon3 = weapons[2]?.type ?? 0;
        const weapon3_ammo = weapons[2]?.ammo ?? 0;
        amx.callNative("SetSpawnInfo", "iiiffffiiiiii", this.id, team, skin, x, y, z, rotation, weapon1, weapon1_ammo, weapon2, weapon2_ammo, weapon3, weapon3_ammo);
    }

    public spawn(): boolean {
        return Boolean(amx.callNative("SpawnPlayer", "i", this.id).retval);
    }

    public set pos({x, y, z}: Position) {
        amx.callNative("SetPlayerPos", "ifff", this.id, x, y, z);
    }

    public get pos(): Position {
        const [x, y, z] = amx.callNative("GetPlayerPos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public posFindZ({x, y, z}: Position): boolean {
        return Boolean(amx.callNative("SetPlayerPosFindZ", "ifff", this.id, x, y, z).retval);
    }

    public set angle(angle: number) {
        amx.callNative("SetPlayerFacingAngle", "if", this.id, angle);
    }

    public get angle(): number {
        return amx.callNative("GetPlayerFacingAngle", "iF", this.id)[0] as number;
    }

    public isInRangeOfPoint(range: number, {x, y, z}: Position): boolean {
        return Boolean(amx.callNative("IsPlayerInRangeOfPoint", "iffff", this.id, range, x, y, z).retval);
    }

    public distanceFromPoint({x, y, z}: Position): number {
        return amx.callNativeInFloat("GetPlayerDistanceFromPoint", "ifff", this.id, x, y, z).retval;
    }

    public isStreamedIn(forPlayer: Player): boolean {
        return Boolean(amx.callNative("IsPlayerStreamedIn", "ii", this.id, forPlayer.id).retval);
    }

    public set interior(interior: number) {
        amx.callNative("SetPlayerInterior", "ii", this.id, interior);
    }

    public get interior(): number {
        return amx.callNative("GetPlayerInterior", "i", this.id).retval;
    }

    public set health(health: number) {
        amx.callNative("SetPlayerHealth", "if", this.id, health);
    }

    public get health(): number {
        return amx.callNative("GetPlayerHealth", "iF", this.id)[0] as number;
    }

    public set armour(armour: number) {
        amx.callNative("SetPlayerArmour", "if", this.id, armour);
    }

    public get armour(): number {
        return amx.callNative("GetPlayerArmour", "iF", this.id)[0] as number;
    }

    public ammo(weapon: Weapons, ammo: number): boolean {
        return Boolean(amx.callNative("SetPlayerAmmo", "iii", this.id, weapon, ammo).retval);
    }

    public getAmmo(): number {
        return amx.callNative("GetPlayerAmmo", "i", this.id).retval;
    }

    public weaponState(): WeaponStates {
        return amx.callNative("GetPlayerWeaponState", "i", this.id).retval;
    }

    public get targetPlayer(): Player {
        return new Player(amx.callNative("GetPlayerTargetPlayer", "i", this.id).retval);
    }

    public get targetActor(): Actor {
        return new Actor(amx.callNative("GetPlayerTargetActor", "i", this.id).retval);
    }

    public set team(team: number) {
        amx.callNative("SetPlayerTeam", "ii", this.id, team);
    }

    public get team(): number {
        return amx.callNative("GetPlayerTeam", "i", this.id).retval;
    }

    public set score(score: number) {
        amx.callNative("SetPlayerScore", "ii", this.id, score);
    }

    public get score(): number {
        return amx.callNative("GetPlayerScore", "i", this.id).retval;
    }

    public get drunkLevel(): number {
        return amx.callNative("GetPlayerDrunkLevel", "i", this.id).retval;
    }

    public set drunkLevel(level: number) {
        amx.callNative("SetPlayerDrunkLevel", "ii", this.id, level);
    }

    public set color(color: number) {
        amx.callNative("SetPlayerColor", "ii", this.id, color);
    }

    public get color(): number {
        return amx.callNative("GetPlayerColor", "i", this.id).retval;
    }

    public set skin(skin: number) {
        amx.callNative("SetPlayerSkin", "ii", this.id, skin);
    }

    public get skin(): number {
        return amx.callNative("GetPlayerSkin", "i", this.id).retval;
    }

    public giveWeapon(weapon: Weapons, ammo: number): boolean {
        return Boolean(amx.callNative("GivePlayerWeapon", "iii", this.id, weapon, ammo).retval);
    }

    public resetWeapons(): boolean {
        return Boolean(amx.callNative("ResetPlayerWeapons", "i", this.id).retval);
    }

    public set armedWeapon(weapon: Weapons) {
        amx.callNative("SetPlayerArmedWeapon", "ii", this.id, weapon);
    }

    public weaponData(slot: number): Weapon {
        const [type, ammo] = amx.callNative("GetPlayerWeaponData", "iiII", this.id, slot) as number[];
        return {type, ammo};
    }

    public giveMoney(money: number): boolean {
        return Boolean(amx.callNative("GivePlayerMoney", "ii", this.id, money).retval);
    }

    public resetMoney(): boolean {
        return Boolean(amx.callNative("ResetPlayerMoney", "i", this.id).retval);
    }

    public set name(name: string) {
        amx.callNative("SetPlayerName", "is", this.id, name);
    }

    public get name(): string {
        return amx.callNative("GetPlayerName", "iSi", this.id, constants.MAX_PLAYER_NAME, constants.MAX_PLAYER_NAME)[0] as string;
    }

    public get money(): number {
        return amx.callNative("GetPlayerMoney", "i", this.id).retval;
    }

    public get state(): PlayerStates {
        return amx.callNative("GetPlayerState", "i", this.id).retval;
    }

    public get ip(): string {
        return amx.callNative("GetPlayerIp", "iSi", this.id, 16, 16)[0] as string;
    }

    public get ping(): number {
        return amx.callNative("GetPlayerPing", "i", this.id).retval;
    }

    public get weapon(): Weapons {
        return amx.callNative("GetPlayerWeapon", "i", this.id).retval;
    }

    public get keys(): IKeys {
        const [keys, upDown, leftRight] = amx.callNative("GetPlayerKeys", "iIII", this.id) as number[];
        return {keys, upDown, leftRight};
    }

    public set time({hour, minute}: PlayerTime) {
        amx.callNative("SetPlayerTime", "iii", this.id, hour, minute);
    }

    public get time(): PlayerTime {
        const [hour, minute] = amx.callNative("GetPlayerTime", "iII", this.id) as number[];
        return {hour, minute};
    }

    public set toggleClock(toggle: boolean) {
        amx.callNative("TogglePlayerClock", "ii", this.id, Number(toggle));
    }

    public set weather(weather: number) {
        amx.callNative("SetPlayerWeather", "ii", this.id, weather);
    }

    public forceClassSelection(): void {
        amx.callNative("ForceClassSelection", "i", this.id);
    }

    public set wantedLevel(level: number) {
        amx.callNative("SetPlayerWantedLevel", "ii", this.id, level);
    }

    public get wantedLevel(): number {
        return amx.callNative("GetPlayerWantedLevel", "i", this.id).retval;
    }

    public set fightingStyle(style: FightStyles) {
        amx.callNative("SetPlayerFightingStyle", "ii", this.id, style);
    }

    public get fightingStyle(): FightStyles {
        return amx.callNative("GetPlayerFightingStyle", "i", this.id).retval;
    }

    public set velocity({x, y, z}: Position) {
        amx.callNative("SetPlayerVelocity", "ifff", this.id, x, y, z);
    }

    public get velocity(): Position {
        const [x, y, z] = amx.callNative("GetPlayerVelocity", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public crimeReport(suspect: Player, crime: number): void {
        amx.callNative("PlayCrimeReportForPlayer", "iii", this.id, suspect.id, crime);
    }

    public audio({url, x = 0, y = 0, z = 0, distance = 50, usePos = false}: PlayerAudioOptions): boolean {
        return Boolean(amx.callNative("PlayAudioStreamForPlayer", "isffffi", this.id, url, x, y, z, distance, Number(usePos)).retval);
    }

    public stopAudio(): void {
        amx.callNative("StopAudioStreamForPlayer", "i", this.id);
    }

    public set shopName(shopName: string) {
        amx.callNative("SetPlayerShopName", "is", this.id, shopName);
    }

    public skillLevel(skill: WeaponSkills, level: number): boolean {
        return Boolean(amx.callNative("SetPlayerSkillLevel", "iii", this.id, skill, level).retval);
    }

    public get surfingVehicle(): Vehicle {
        return new Vehicle(amx.callNative("GetPlayerSurfingVehicleID", "i", this.id).retval);
    }

    public get surfingObject(): SampObject {
        return new SampObject(amx.callNative("GetPlayerSurfingObjectID", "i", this.id).retval);
    }

    public removeBuilding({model, x, y, z, radius}: RemoveBuildingForPlayerOptions): void {
        amx.callNative("RemoveBuildingForPlayer", "iiffff", this.id, model, x, y, z, radius);
    }

    public lastShot(): PlayerShot {
        const [originX, originY, originZ, hitX, hitY, hitZ] = amx.callNative("GetPlayerLastShotVectors", "iFFFFFF", this.id) as number[];
        return {origin: {x: originX, y: originY, z: originZ}, hit: {x: hitX, y: hitY, z: hitZ}};
    }

    public attachedObject({index, model, bone, offset = {x: 0, y: 0, z: 0}, rot = {x: 0, y: 0, z: 0}, scale = {x: 1, y: 1, z: 1}, materialColors = [0, 0]}: PlayerAttachedObjectOptions): boolean {
        return Boolean(amx.callNative("SetPlayerAttachedObject", "iiiifffffffffii", this.id, index, model, bone, offset.x, offset.y, offset.z, rot.x, rot.y, rot.z, scale.x, scale.y, scale.z, materialColors[0], materialColors[1]).retval);
    }

    public removeAttachedObject(index: number): boolean {
        return Boolean(amx.callNative("RemovePlayerAttachedObject", "ii", this.id, index).retval);
    }

    public isAttachedObject(index: number): boolean {
        return Boolean(amx.callNative("IsPlayerAttachedObjectSlotUsed", "ii", this.id, index).retval);
    }

    public editAttachedObject(index: number): boolean {
        return Boolean(amx.callNative("EditAttachedObject", "ii", this.id, index).retval);
    }

    public readonly vars: {[varName: string]: PlayerVariable} = new Proxy({}, {
        get: (target, key) => {
            return new PlayerVariable(this, String(key));
        },
        deleteProperty: (target, key) => {
            const variable = new PlayerVariable(this, String(key));
            variable.delete();
            return true;
        }
    });

    public get varsUpperIndex(): number {
        return amx.callNative("GetPVarsUpperIndex", "i", this.id).retval;
    }

    public getVarNameAtIndex(index: number, length: number): string {
        return amx.callNative("GetPVarNameAtIndex", "iiSi", this.id, index, length, length)[0] as string;
    }

    public chatBubble({text, color, drawDistance, expireTime}: PlayerChatBubbleOptions): void {
        amx.callNative("SetPlayerChatBubble", "isifi", this.id, text, color, drawDistance, expireTime);
    }

    public put(vehicle: Vehicle, seat: number = 0): boolean {
        return Boolean(amx.callNative("PutPlayerInVehicle", "iii", this.id, vehicle.id, seat).retval);
    }

    public get vehicle(): Vehicle {
        return new Vehicle(amx.callNative("GetPlayerVehicleID", "i", this.id).retval);
    }

    public get vehicleSeat(): number {
        return amx.callNative("GetPlayerVehicleSeat", "i", this.id).retval;
    }

    public removeFromVehicle(): boolean {
        return Boolean(amx.callNative("RemovePlayerFromVehicle", "i", this.id).retval);
    }

    public set controllable(controllable: boolean) {
        amx.callNative("TogglePlayerControllable", "ii", this.id, Number(controllable));
    }

    public sound({id, x, y, z}: PlayerPlaySoundOptions): boolean {
        return Boolean(amx.callNative("PlayerPlaySound", "iifff", this.id, id, x, y, z).retval);
    }

    public anim({library, name, speed = 4.1, loop, lockX, lockY, freeze, time, forceSync = false}: PlayerAnimationOptions): void {
        amx.callNative("ApplyAnimation", "issfiiiiii", this.id, library, name, speed, Number(loop), Number(lockX), Number(lockY), Number(freeze), time, Number(forceSync));
    }

    public clearAnims(forceSync: boolean = false): void {
        amx.callNative("ClearAnimations", "ii", this.id, Number(forceSync));
    }

    public animIndex(): number {
        return amx.callNative("GetPlayerAnimationIndex", "i", this.id).retval;
    }

    public getAnimName(index: number, libraryLength: number, nameLength: number): AnimationName {
        const [library, name] = amx.callNative("GetAnimationName", "iSiSi", index, libraryLength, libraryLength, nameLength, nameLength) as string[];
        return {library, name};
    }

    public get specialAction(): SpecialActions {
        return amx.callNative("GetPlayerSpecialAction", "i", this.id).retval;
    }

    public set specialAction(action: SpecialActions) {
        amx.callNative("SetPlayerSpecialAction", "ii", this.id, action);
    }

    public disableRemoteVehicleCollisions(disable: boolean): boolean {
        return Boolean(amx.callNative("DisableRemoteVehicleCollisions", "ii", this.id, Number(disable)).retval);
    }

    public checkpoint({x, y, z, size}: PlayerCheckpointOptions): boolean {
        return Boolean(amx.callNative("SetPlayerCheckpoint", "iffff", this.id, x, y, z, size).retval);
    }

    public disableCheckpoint(): boolean {
        return Boolean(amx.callNative("DisablePlayerCheckpoint", "i", this.id).retval);
    }

    public raceCheckpoint({type, x, y, z, next, size}: PlayerRaceCheckpointOptions): boolean {
        return Boolean(amx.callNative("SetPlayerRaceCheckpoint", "iifffffff", this.id, type, x, y, z, next.x, next.y, next.z, size).retval);
    }

    public disableRaceCheckpoint(): void {
        amx.callNative("DisablePlayerRaceCheckpoint", "i", this.id);
    }

    public worldBounds({min, max}: PlayerWorldBoundsOptions): void {
        amx.callNative("SetPlayerWorldBounds", "iffff", this.id, max.x, min.x, max.y, min.y);
    }

    public markerForPlayer(player: Player, color: number): void {
        amx.callNative("SetPlayerMarkerForPlayer", "iii", this.id, player.id, color);
    }

    public showNameTagForPlayer(player: Player, show: boolean): void {
        amx.callNative("ShowPlayerNameTagForPlayer", "iii", this.id, player.id, Number(show));
    }

    public mapIcon({id, x, y, z, type, color, style = MapIconStyle.LOCAL}: PlayerMapIconOptions): boolean {
        return Boolean(amx.callNative("SetPlayerMapIcon", "iifffiii", this.id, id, x, y, z, type, color, style).retval);
    }

    public removeMapIcon(idOrIcon: number | MapIcon): boolean {
        let id: number = -1;
        if(typeof idOrIcon === "number")
            id = idOrIcon;
        else if(idOrIcon instanceof MapIcon)
            id = idOrIcon.id;
        return Boolean(amx.callNative("RemovePlayerMapIcon", "ii", this.id, id).retval);
    }

    public set cameraPos({x, y, z}: Position) {
        amx.callNative("SetPlayerCameraPos", "ifff", this.id, x, y, z);
    }

    public get cameraPos(): Position {
        const [x, y, z] = amx.callNative("GetPlayerCameraPos", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public cameraLookAt({x, y, z, style = CameraStyles.CUT}: PlayerCameraLookAtOptions): boolean {
        return Boolean(amx.callNative("SetPlayerCameraLookAt", "ifffi", this.id, x, y, z, style).retval);
    }

    public cameraBehind(): void {
        amx.callNative("SetCameraBehindPlayer", "i", this.id);
    }

    public get cameraFront(): Position {
        const [x, y, z] = amx.callNative("GetPlayerCameraFrontVector", "iFFF", this.id) as number[];
        return {x, y, z};
    }

    public get cameraMode(): number {
        return amx.callNative("GetPlayerCameraMode", "i", this.id).retval;
    }

    public set cameraTarget(enable: boolean) {
        amx.callNative("EnablePlayerCameraTarget", "ii", this.id, Number(enable));
    }

    public get cameraTargetObject(): SampObject {
        return new SampObject(amx.callNative("GetPlayerCameraTargetObject", "i", this.id).retval);
    }

    public get cameraTargetVehicle(): Vehicle {
        return new Vehicle(amx.callNative("GetPlayerCameraTargetVehicle", "i", this.id).retval);
    }

    public get cameraTargetPlayer(): Player {
        return new Player(amx.callNative("GetPlayerCameraTargetPlayer", "i", this.id).retval);
    }

    public get cameraTargetActor(): Actor {
        return new Actor(amx.callNative("GetPlayerCameraTargetActor", "i", this.id).retval);
    }

    public get cameraAspectRatio(): number {
        return amx.callNativeInFloat("GetPlayerCameraAspectRatio", "i", this.id).retval;
    }

    public get cameraZoom(): number {
        return amx.callNativeInFloat("GetPlayerCameraZoom", "i", this.id).retval;
    }

    public attachCamera(attached: SampObject | PlayerObject): void {
        if(attached instanceof SampObject)
            amx.callNative("AttachCameraToObject", "ii", this.id, attached.id);
        else if(attached instanceof PlayerObject)
            amx.callNative("AttachCameraToPlayerObject", "ii", this.id, attached.id);
    }

    public interpolateCameraPos({from, to, time, style = CameraStyles.CUT}: InterpolateCameraPosOptions): void {
        amx.callNative("InterpolateCameraPos", "iffffffii", this.id, from.x, from.y, from.z, to.x, to.y, to.z, time, style);
    }

    public interpolateCameraLookAt({from, to, time, style = CameraStyles.CUT}: InterpolateCameraPosOptions): void {
        amx.callNative("InterpolateCameraLookAt", "iffffffii", this.id, from.x, from.y, from.z, to.x, to.y, to.z, time, style);
    }

    public get connected(): boolean {
        return Boolean(amx.callNative("IsPlayerConnected", "i", this.id).retval);
    }

    public isInVehicle(vehicle: Vehicle): boolean {
        return Boolean(amx.callNative("IsPlayerInVehicle", "ii", this.id, vehicle.id).retval);
    }

    public isInAnyVehicle(): boolean {
        return Boolean(amx.callNative("IsPlayerInAnyVehicle", "i", this.id).retval);
    }

    public isInCheckpoint(): boolean {
        return Boolean(amx.callNative("IsPlayerInCheckpoint", "i", this.id).retval);
    }

    public isInRaceCheckpoint(): boolean {
        return Boolean(amx.callNative("IsPlayerInRaceCheckpoint", "i", this.id).retval);
    }

    public set world(world: number) {
        amx.callNative("SetPlayerVirtualWorld", "ii", this.id, world);
    }

    public get world(): number {
        return amx.callNative("GetPlayerVirtualWorld", "i", this.id).retval;
    }

    public set stuntBonus(enable: boolean) {
        amx.callNative("EnableStuntBonusForPlayer", "ii", this.id, Number(enable));
    }

    public set spectating(spectating: boolean) {
        amx.callNative("TogglePlayerSpectating", "ii", this.id, Number(spectating));
    }

    public spectate(target: Player | Vehicle, mode: SpectateModes = SpectateModes.NORMAL): boolean {
        if(target instanceof Player)
            return Boolean(amx.callNative("PlayerSpectatePlayer", "iii", this.id, target.id, mode).retval);
        else if(target instanceof Vehicle)
            return Boolean(amx.callNative("PlayerSpectateVehicle", "iii", this.id, target.id, mode).retval);
        return false;
    }

    public startRecordingData(type: RecordTypes, name: string): void {
        amx.callNative("StartRecordingPlayerData", "iis", this.id, type, name);
    }

    public stopRecordingData(): void {
        amx.callNative("StopRecordingPlayerData", "i", this.id);
    }

    public select(hoverColor: number): void {
        amx.callNative("SelectTextDraw", "ii", this.id, hoverColor);
    }

    public cancelSelect(): void {
        amx.callNative("CancelSelectTextDraw", "i", this.id);
    }

    public explosion({x, y, z, type, radius}: ExplosionOptions): void {
        amx.callNative("CreateExplosionForPlayer", "ifffif", this.id, x, y, z, type, radius);
    }

    public selectObject(): void {
        amx.callNative("SelectObject", "i", this.id);
    }

    public cancelEdit(): void {
        amx.callNative("CancelEdit", "i", this.id);
    }

    public toString(): string {
        return this.name + "[" + this.id + "]";
    }

    public is(player: Player): boolean {
        return this.id === player.id;
    }
}